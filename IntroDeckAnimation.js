import { dataProvider, dp } from "./dataProvider.js";
import GraphicsHelper from "./class/helper/GraphicsHelper.js";
import { Card } from "./Card.js";
import Utils from "./class/util/Utils.js";
import { CommonButton } from "./CommonButton.js";

export class IntroDeckAnimation extends PIXI.Container {
    
    constructor() {
        super();
        this.init();
    }

    init(){
        this.sortableChildren = true;
        this.initCardTable();

        const card0 = this.addChild(new Card(0));
        card0.position.set(dp.stageRect.halfWidth, dp.stageRect.halfHeight);
        card0.scale.set(1.5);
        card0.rotation = Utils.degreesToRadians(Math.random()*10 - 5);
        card0.alpha = 0;
        gsap.timeline({delay:0.1})
            .to(card0, {alpha:1, duration:0.5, ease:'none'})
            .to(card0, {rotation:Utils.degreesToRadians(0), duration:0.5, ease:'sine.out'}, '<')
            .to(card0.scale, {x:0.8, y:0.8, duration:1.1, ease:'expo.out'}, '<')
            .to(card0.scale, {x:0.78, y:0.78, duration:0.5, ease:'sine.inOut', delay: 0.4})


            .to(card0, {y:0, duration:0.5, ease:'circ.in'}, '<0.3')
            .to(card0, {alpha:0, duration:0.3, ease:'none'}, '<0.3')
            .call(()=>{
                this.initOptionScreen();
                this.initCardListButton();
            });
        card0.zIndex = 10;
    };

    initCardTable(){
        let countX = 0;
        let countY = 0;
        const margin = 2;
        const gridX = Math.round((dp.stageRect.width - margin) / 4);

        this.imageTable = this.addChild(new PIXI.Container());
        this.coverBox = this.addChild(GraphicsHelper.exDrawRect(0, 0, dp.stageRect.width, dp.stageRect.height, false, {color: 0x000000}));
        // this.coverBox.alpha = 0.7;
        gsap.timeline({delay:2.2})
            .to(this.coverBox, {alpha:0.7, duration:0.5, ease:'none'})

        Utils.shuffleArray(dp.introDeck);
        const maxDisp = dp.introDeck.length > 20 ? 20 : dp.introDeck.length;
        for(let i = 0; i < maxDisp; i++){
            let card = this.imageTable.addChild(new Card(dp.introDeck[i]));
            // card.alpha = 0;
            Utils.resizeImage(card, {width: gridX, height: gridX})
            card.position.set(countX * gridX + card.width / 2 + margin / 2, countY * card.height + card.height / 2);
            // Utils.snapshotPos(card);
            // const tl = gsap.timeline({delay:i / 30 + 1.8})
                // .to(card, {alpha:1, y: card.snapshot.y, duration: 0.5}, '<')
            // card.y += 100;
            if(countX < 3){
                countX ++;
            }else{
                countX = 0;
                countY ++;
            }
        }
    }

    initOptionScreen(){
        this.textDescripton = this.addChild(new PIXI.Text(
`ゲーム進行中にランダムで
ルール追加イベントが発生する

＜即時イベント＞
全員手を止めて手番プレイヤーが
追加ルールを確認する
            
＜行動後イベント＞
手番プレイヤーの行動終了後
次のプレイヤーが追加ルールを確認する`, 
        {
            fontFamily: 'Kaisei Decol', 
            fontWeight: 700,
            fontSize: 50, fill: 0xFEFEFE,
            align: 'center',
            breakWords: true,
            wordWrap: true,
            wordWrapWidth: 900,
            lineHeight: 80,
        }));
        this.textDescripton.anchor.set(0.5, 0);
        this.textDescripton.x = dp.stageRect.halfWidth;
        this.textDescripton.y = 120;
        this.textDescripton.alpha = 0;

        gsap.to(this.textDescripton, {alpha:1, duration:0.3, ease:'none', delay:0.2})

        
        /**
         * config
         */

        const configContainer = this.addChild(new PIXI.Container());
        //＜発生頻度の設定＞

        // this.minVal = 1;
        this.minVal = 10;
        const uiSlider = configContainer.addChild(Utils.addUISlider(dp.app, dp.stageRect.width - 200, this, 'minVal', 1, 100, this.minVal));
        uiSlider.position.set(dp.stageRect.halfWidth - uiSlider.width / 2, this.textDescripton.y + this.textDescripton.height + 80);
        // uiSlider.x = 50;
        
        //　opt 追加イベントの設定
        uiSlider.on('customEvent', (data) => {
            
            this.minVal = Math.round(data.value);
            this.minInterval.text = `最小インターバル: ${this.minVal}秒`;
        });

        this.minInterval = configContainer.addChild(new PIXI.Text(`最小インターバル: ${this.minVal}秒`, {
            fontFamily: 'Kaisei Decol', 
            fontWeight: 700,
            fontSize: 30, fill: 0xFEFEFE,
        }));
        this.minInterval.anchor.set(0.5, 0.5);
        this.minInterval.x = dp.stageRect.halfWidth;
        this.minInterval.y = uiSlider.y - 20;




        // this.randomVal = 1;
        this.randomVal = 10;
        const randomSlider = configContainer.addChild(Utils.addUISlider(dp.app, dp.stageRect.width - 200, this, 'randomVal', 1, 100, this.randomVal));
        randomSlider.position.set(dp.stageRect.halfWidth - randomSlider.width / 2, uiSlider.y + 150);

        randomSlider.on('customEvent', (data) => {
            
            this.randomVal = Math.round(data.value);
            this.randomInterval.text = `最小インターバル: ${this.randomVal}秒`;
        });
        this.randomInterval = configContainer.addChild(new PIXI.Text(`追加ランダムインターバル: ${this.randomVal}秒`, {
            fontFamily: 'Kaisei Decol', 
            fontWeight: 700,
            fontSize: 30, fill: 0xFEFEFE,
        }));
        this.randomInterval.anchor.set(0.5, 0.5);
        this.randomInterval.x = dp.stageRect.halfWidth;
        this.randomInterval.y = randomSlider.y - 20;

        const countdownContainer = configContainer.addChild(new PIXI.Container());
        this.countdown = countdownContainer.addChild(new PIXI.Text('カウントダウンを表示する', {
            fontFamily: 'Kaisei Decol', 
            fontWeight: 700,
            fontSize: 30, fill: 0xFEFEFE,
        }));
        this.countdown.anchor.set(0, 0.5);
        // this.countdown.x = dp.stageRect.halfWidth;
        this.countdown.y = randomSlider.y + 150;

        const toggleCountdown = countdownContainer.addChild(Utils.addUIToggleButton(dp.app, dp.game, 'showCountdown', dp.game.showCountdown));
        toggleCountdown.x = this.countdown.x + this.countdown.width + 30;
        toggleCountdown.y = this.countdown.y - toggleCountdown.height / 2;

        countdownContainer.x = dp.stageRect.halfWidth - countdownContainer.width / 2;

        toggleCountdown.on('customEvent', (data) => {
            dp.game.showCountdown = data.value;
        });

        

        const btnStartGame = this.addChild(new CommonButton('ゲームを開始'));
        btnStartGame.x = dp.stageRect.halfWidth;
        btnStartGame.y = dp.stageRect.height - (dp.stageRect.height / 10);
        btnStartGame.alpha = 0;

        gsap.timeline()
        .to(btnStartGame, {alpha:1, duration:0.3, ease:'none', delay:0.4})
        .call(()=>{
            btnStartGame.cursor    = 'pointer';
            btnStartGame.eventMode = 'static';
        });
        
        const onTap = (e) => {

            dp.game.minInterval = this.minVal;
            dp.game.randomInterval = this.randomVal;

            PIXI.sound.play('1tick3');
            btnStartGame.eventMode = 'none';
            btnStartGame.activate();
            gsap.timeline()
            .to(this, {alpha:0, duration:0.3, ease:'none'})
            .call(()=>{
                this.parent.standby();
                this.parent.initEndButton();
                this.parent.removeChild((this));
            });
        };

        btnStartGame.on('pointertap', onTap);
    }

    initCardListButton(){
        this.cardListButton = this.addChild(new PIXI.Container());
        this.cardListButton.zIndex = 10;
        
        this.background = GraphicsHelper.exDrawRoundedRect(0, 0, 250, 70, 15, false, {color:0xFFFFFF});
        this.background.alpha = 0.2;
        Utils.pivotCenter(this.background);
        this.cardListButton.addChild(this.background);
        this.backgroundRim = GraphicsHelper.exDrawRoundedRect(0, 0, 250, 70, 15, {color:0xFFFFFF, width:4}, false);
        this.backgroundRim.alpha = 0.5;
        Utils.pivotCenter(this.backgroundRim);
        this.cardListButton.addChild(this.backgroundRim);

        this.labelText = this.cardListButton.addChild(new PIXI.Text('カード一覧', {
            fontFamily: 'Kaisei Decol', 
            fontWeight: 700,
            fontSize: 40, fill: 0xEFEFEF,
            dropShadow: true,
            dropShadowColor: '#000000',
            dropShadowAlpha: 0.9,
            dropShadowBlur: 16,
            dropShadowAngle: 0,
            dropShadowDistance: 0,
            
        }));
        this.labelText.anchor.set(0.5, 0.5);

        this.cardListButton.position.set(
            dp.stageRect.halfWidth,
            this.cardListButton.height / 2 + 20
        );

        this.cardListButton.cursor    = 'pointer';
        this.cardListButton.eventMode = 'static';
        const onTap = (e) => {
            PIXI.sound.play('1tick3');
            this.cardListButton.eventMode = 'none';
            // this.cardListButton.activate();
            gsap.timeline()
                .to(this, {alpha:0, duration:0.3, ease:'none'})
                .call(()=>{
                    this.parent.initCardView();
                    this.parent.removeChild((this));
            });
        };

        this.cardListButton.on('pointertap', onTap);
    }
}