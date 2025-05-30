import { dataProvider, dp } from "./dataProvider.js";
import GraphicsHelper from "./class/helper/GraphicsHelper.js";
import { Card } from "./Card.js";
import Utils from "./class/util/Utils.js";
import { CommonButton } from "./CommonButton.js";
import { EventBlock } from "./EventBlock.js";

export class CardPreparer extends PIXI.Container {
    
    constructor(delay, cardId) {
        super();
        this.init(delay, cardId);
    }

    init(delay, cardId){
        this.sortableChildren = true;
        this.cardId = cardId;
        

        this.textAndButton = this.addChild(new PIXI.Container());
        
        const hourglass = PIXI.Sprite.from(dataProvider.assets.game_in_progress);
        hourglass.anchor.set(0.5);
        Utils.layoutCenter(hourglass, dp.stageRect);
        hourglass.scale.set(0.8);

        const progressBar = this.addChild(GraphicsHelper.exDrawRect(0, 0, hourglass.width, 20, false, {color:0xFFFF00}));
        progressBar.x = dp.stageRect.halfWidth - hourglass.width / 2;
        progressBar.y = hourglass.y + hourglass.height /2;
        if(!dp.game.showCountdown){
            progressBar.visible = false;
        }


        this.gameInProgressText = this.addChild(new PIXI.Text("ゲームが進行中...", {
            fontFamily: 'Kaisei Decol', 
            fontWeight: 700,
            fontSize: 80, fill: 0xFEFEFE,
            align: 'center',
            breakWords: true,
            wordWrap: true,
            wordWrapWidth: 800,
        }));
        this.gameInProgressText.anchor.set(0.5, 0);
        this.gameInProgressText.x = dp.stageRect.halfWidth;
        this.gameInProgressText.y = hourglass.y - 550;
        gsap.timeline({repeat: -1})
            .to(this.gameInProgressText, {alpha:0.4, duration:0.3, ease:'none', delay:2})
            .to(this.gameInProgressText, {alpha:1, duration:0.3, ease:'none'})

        hourglass.scale.set(0.1);
        this.addChild(hourglass);
        gsap.timeline()
            .to(hourglass.scale, {x:0.8, y:0.8, duration:0.3, ease:'expo.out'})
            .to(hourglass.scale, {x:0.1, y:0.1, duration:0.3, ease:'expo.in', delay: delay / 1000 - 0.5})
            .to(this.gameInProgressText, {alpha:0, duration:0.3, ease:'none'}, '<')
            .call(()=>{
                hourglass.visible = false;
                this.gameInProgressText.visible = false;
            });
    }

    initTextAndButton(){
        const nextCardInfo = Utils.findObjectById(dp.assets.csv, dp.deck[dp.game.currentIndex]);
        const onImmediateIntervention = nextCardInfo.event_trigger == 'onImmediateIntervention';

        const eventBlock = this.addChild(new EventBlock(onImmediateIntervention));
        Utils.staticLayout(eventBlock, 'top', {top: 10})
        // eventBlock.position.set(dp.stageRect.halfWidth, 140);
        eventBlock.alpha = 0;
        
        gsap.timeline({delay: 0.5})
            .to(eventBlock, {alpha:1, duration:0.4, ease:'none'}, '<')
            .call(()=>{
                this.cardBack.cursor    = 'pointer';
                this.cardBack.eventMode = 'static';
            });
        
        const onTap = (e) => {
            gsap.timeline()
                // .to(this.eventTypeImage.scale, {x:0.3, y:0.3, duration:0.3, ease:'none'})
                .to(eventBlock, {alpha:0, duration:0.3, ease:'none'}, '<')
                this.cardBack.cursor    = 'none';
            // btnFlipCard.eventMode = 'none';
            this.flipCard();
            this.textAndButton.visible = false;
            // PIXI.sound.play('1tick3');
            PIXI.sound.play('pop1');
            PIXI.sound.play('pop2');
        };

        // btnFlipCard.on('pointertap', onTap);

        this.cardBack = this.addChild(new Card('card_back'));
        this.cardBack.scale.set(1);
        this.cardBack.rotation = Utils.degreesToRadians(Math.random() * 10 -5);
        this.cardBack.position.set(dp.stageRect.halfWidth, dp.stageRect.halfHeight + dp.stageRect.halfHeight/10);
        
        this.cardBack.on('pointertap', onTap);
        /**
         * @todo ざっくりすぎるので調整
         */

        this.cardBack.height = dp.stageRect.height * 0.6;
        const cardBackSize = this.cardBack.scale.y;
        this.cardBack.scale.set(cardBackSize * 1.5);

        // const cardBackSize = 0.45 + (dp.stageRect.aspectRatio * dp.stageRect.aspectRatio / 22);

        gsap.timeline()
            .to(this.cardBack, {rotation: Utils.degreesToRadians(Math.random() * 10 -5), duration:0.2, ease:'sine.out'}, '<')
            .to(this.cardBack.scale, {x:cardBackSize, y:cardBackSize, duration:0.2, ease:'sine.in'}, '<')
            .to(this.cardBack.scale, {x:cardBackSize*1.05, y:cardBackSize*1.05, duration:0.15, ease:'back.out(0.4)'})
            .to(this.cardBack.scale, {x:cardBackSize, y:cardBackSize, duration:0.15})
        this.cardBack.zIndex = 5;


        // const checkRect = GraphicsHelper.exDrawRect(0, 0, dp.stageRect.width, 
        //     dp.stageRect.height * 0.6,
        //     {color:0xFF0000, width:10}, false);
        // checkRect.y = 100;

        // this.addChild(checkRect);
    }

    flipCard(){
        this.parent.endButton.visible = true;
        this.whiteOverray = this.addChild(GraphicsHelper.exDrawRect(0, 0, dp.stageRect.width, dp.stageRect.height, false, {color: 0xFFFFFF}));
        this.whiteOverray.alpha = 0;
        this.whiteOverray.zIndex = 20;

        gsap.timeline()
            .to(this.cardBack.scale, {x:0.7, y:0.7, duration:0.2, ease:'expo.out'})
            // .to(this.cardBack, {y:dp.stageRect.halfHeight, rotation:Utils.degreesToRadians(15 - Math.random()*30), duration:0.3, ease:'none'}, '<')
            .to(this.whiteOverray, {alpha:1, duration:0.2, ease:'expo.out'}, '<')
            .call(()=>{
                // this.removeChild(this.whiteOverray);
                this.removeChild(this.cardBack);
                this.removeChild(this.eventTypeImage);
                this.flipCard2();
            });
            
    }


    flipCard2(){
        // 
        const card = this.addChild(new Card(this.cardId));

        const onTap = (e) => {
            PIXI.sound.play('1tick2');
            card.eventMode = 'none';
            this.parent.standby();
            this.parent.removeChild(this);
        };

        card.on('pointertap', onTap);
        card.anchor = new PIXI.Point(0.5, 0.5);
        card.anchor.set(0.5);
        card.x = dp.stageRect.halfWidth;
        card.y = dp.stageRect.halfHeight;
        
        card.height = dp.stageRect.height * 0.75;
        const cardScale = card.scale.y;
        card.scale.set(cardScale - 0.1);

        // card.scale.set(0.7);
        card.alpha = 0;
        gsap.timeline({delay:0.1})
            .to(this.whiteOverray, {alpha:0, duration:0.2, ease:'expo.out'})
            .to(card, {alpha:1, duration:0.3, ease:'none'}, '<0.2')
            .to(card.scale, {x:cardScale*1.1, y:cardScale*1.1, duration:0.6, ease:'expo.out'}, '<0.1')
            .call(()=>{
                card.cursor    = 'pointer';
                card.eventMode = 'static';
            });
    }


    onExecuteFX(){
        // return false;
        const fxContainer = this.addChild(new PIXI.Container());
        const fxfx = this.initFX(fxContainer);
        fxfx.scale.set(0.4);
        const fxCircle = fxContainer.addChild(GraphicsHelper.exDrawCircle(0, 0, 200, {color:0xFFFFFF, width:4}, false));
        const fxCircle2 = fxContainer.addChild(GraphicsHelper.exDrawCircle(0, 0, 200, false, {color:0xFFFFFF}));
        const fxCircle3 = fxContainer.addChild(GraphicsHelper.exDrawCircle(0, 0, 200, {color:0xFFFFFF, width:10}, false));
        const fxCircle4 = fxContainer.addChild(GraphicsHelper.exDrawCircle(0, 0, 200, {color:0xFFFFFF, width:16}, false));
        const fxCircle5 = fxContainer.addChild(GraphicsHelper.exDrawCircle(0, 0, 50, false, {color:0xFFFFFF}));
        fxCircle2.scale.set(4);
        fxCircle3.visible = false;
        fxCircle4.visible = false;
        fxCircle5.scale.set(4);
        fxCircle5.visible = false;
        gsap.timeline()
            .to(fxCircle.scale, {x:6, y:6, duration: 0.5, ease:'expo.out'})
            .to(fxCircle2.scale, {x:0.01, y:0.01, duration: 0.4, ease:'expo.out', onComplete: () => {fxCircle2.visible = false;}}, '<')
            .to(fxfx.scale, {x:1.5, y:1.5, duration:0.4, ease:'expo.in'}, '<')
            .set(fxCircle3, {visible: true}, '<0.2')
            .to(fxCircle3.scale, {x:6, y:6, duration: 0.5, ease:'expo.out'}, '<')
            
            
            .set(fxCircle5, {visible: true}, '<0.1')
            .to(fxCircle5.scale, {x:6, y:6, duration: 0.7, ease:'expo.out'}, '<')
            .to(fxCircle5.scale, {x:22, y:22, duration: 0.3, ease:'expo.in'})
            .call(()=>{
                fxfx.visible = false;
                this.initTextAndButton();
            })
            .to(fxCircle5, {alpha:0, duration: 0.4, ease:'none'})
            .call(()=>{
                fxContainer.visible = false;
            })
            
            .to(fxfx, {rotation:Utils.degreesToRadians(180), duration:0.4, ease:'expo.in'}, '<-0.4')
        fxContainer.x = dp.stageRect.halfWidth;
        fxContainer.y = dp.stageRect.halfHeight;

        
    }


    initFX(container){
        const fxfx = container.addChild(new PIXI.Container());
        for(let i=0; i<20; i++){
            const fx = fxfx.addChild(this.makeFx(true));
            const sec = Math.random()*10+5;
            fx.alpha = 0;
            gsap.timeline()
                .to(fx, {alpha:1, duration:0.5, ease:'none'})
                .to(fx, {rotation:Math.random()*1, duration:sec, ease:'none'}, '-=0.5')
                .to(fx.scale, {x:2, y:2, duration:sec, ease:'none'}, '-='+(0.2+sec))
                .to(fx, {alpha:0, duration:0.5, ease:'none'}, '-=1')
        }
        return fxfx;
    }

    makeFx(isBG){
        const container = new PIXI.Container();
        const num = Math.round(Math.random()*1*5+(isBG ? 5 : 0));
        for(let i=0; i<num; i++){
            container.addChild(this.drawLine(isBG));
        }
        return container;

    }

    drawLine(isBG){
        let line = new PIXI.Graphics();
        line.lineStyle(isBG ? Math.random()*20 : Math.random()*1+1, Math.random()>0.5 ? 0xFFFFFF : 0xFFFFFF);
        // line.lineStyle(Math.random()*(isBG ? 20 : 2), Math.random()>0.5 ? dataProvider.data.colorEmph1 : 0xFFFFFF);
        line.moveTo(0, 0);
        line.lineTo((500+Math.random()*100)*Math.random()*2, 0);
        line.rotation = Math.random()*6;
        line.alpha = Math.random()+0.1;

        return line;
    }
}