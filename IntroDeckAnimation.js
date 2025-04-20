import { dataProvider, dp } from "./dataProvider.js";
import GraphicsHelper from "./class/helper/GraphicsHelper.js";
import { Card } from "./Card.js";
import Utils from "./class/util/Utils.js";
import { CommonButton } from "./CommonButton.js";
import { EventBlock } from "./EventBlock.js";

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
        PIXI.sound.play('1tick1');
        gsap.timeline({delay:0.1})
            .to(card0, {alpha:1, duration:0.5, ease:'none'})
            .to(card0, {rotation:Utils.degreesToRadians(0), duration:0.5, ease:'sine.out'}, '<')
            .to(card0.scale, {x:0.8, y:0.8, duration:1.1, ease:'expo.out'}, '<')
            .to(card0.scale, {x:0.78, y:0.78, duration:0.5, ease:'sine.inOut', delay: 0.4})


            .to(card0, {y:0, duration:0.5, ease:'circ.in',
                onStart: () => {
                    PIXI.sound.play('1tick2');
                }}, '<0.3')
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
        `このゲームでは、プレイ中にランダムでルール追加イベントが発生し、それ以降のルールに影響を与えます。
        イベントは即時と行動前の2種類がありいずれも発生した瞬間からルールが適用されます。`,
        // this.textDescripton = this.addChild(new PIXI.Text('＜ゲームの進め方＞\nゲーム進行中にランダムで\nルール追加イベントが発生する\nカードの強さに影響するルールは\n次に場に出すカードから影響を受ける', 
        {
            fontFamily: 'Kaisei Decol', 
            fontWeight: 700,
            fontSize: 45, fill: 0xFEFEFE,
            align: 'center',
            breakWords: true,
            wordWrap: true,
            wordWrapWidth: 800,
            lineHeight: 55,
        }));
        this.textDescripton.anchor.set(0.5, 0);
        Utils.staticLayout(this.textDescripton, 'top', {top: 5});
        this.textDescripton.alpha = 0;

        gsap.to(this.textDescripton, {alpha:1, duration:0.3, ease:'none', delay:0.2})

        const eventA = this.addChild(new EventBlock(true));
        eventA.position.set(dp.stageRect.halfWidth, this.textDescripton.y + this.textDescripton.height + eventA.height + 10);

        const eventB = this.addChild(new EventBlock(false));
        eventB.position.set(dp.stageRect.halfWidth, eventA.y + eventA.height + 40);

        eventA.alpha = eventB.alpha = 0;

        gsap.timeline({delay:0.2})
            .to(eventA, {alpha:1, duration:0.3, ease:'none'})
            .to(eventB, {alpha:1, duration:0.3, ease:'none'}, '<0.1')
        
        /**
         * config
         */

        const btnStartGame = this.addChild(new CommonButton('ゲームを開始'));
        Utils.staticLayout(btnStartGame, 'bottom', {bottom: 10});
        btnStartGame.alpha = 0;

        gsap.timeline()
        .to(btnStartGame, {alpha:1, duration:0.3, ease:'none', delay:0.4})
        .call(()=>{
            btnStartGame.cursor    = 'pointer';
            btnStartGame.eventMode = 'static';
        });
        
        const onTap = (e) => {

            // dp.game.minInterval = this.minVal;
            // dp.game.randomInterval = this.randomVal;

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
        Utils.staticLayout(this.cardListButton, 'bottom', {bottom: 20});

        // this.cardListButton.position.set(
        //     dp.stageRect.halfWidth,
        //     this.textDescripton.y + dp.stageRect.height - 500
        // );
        this.cardListButton.alpha = 0;

        gsap.timeline({delay:0.3})
        .to(this.cardListButton, {alpha:1, duration:0.4, ease:'none'})
        .call(()=>{
            this.cardListButton.cursor    = 'pointer';
            this.cardListButton.eventMode = 'static';
            
        });

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