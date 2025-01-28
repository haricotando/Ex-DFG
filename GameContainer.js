import { dataProvider, dp } from "./dataProvider.js";
import GraphicsHelper from "./class/helper/GraphicsHelper.js";
import Utils from "./class/util/Utils.js";
import { IntroDeckAnimation } from "./IntroDeckAnimation.js";
import { CardPreparer } from "./CardPreparer.js";
import { CardView } from "./CardView.js";

export class GameContainer extends PIXI.Container {
    
    constructor() {
        super();
        this.sortableChildren = true;
        Utils.shuffleArray(dp.deck);
        dp.game.currentIndex = -1;
        this.init();
        // this.standby();
    }

    init(){
        // const bg = this.addChild(GraphicsHelper.exDrawRect(0, 0, dp.stageRect.width, dp.stageRect.height, false, {color:0x000000}));
        this.addChild(new IntroDeckAnimation());
        setTimeout(() => {
            PIXI.sound.play('1tick1');
        }, 0);
        setTimeout(() => {
            PIXI.sound.play('1tick2');
        }, 1800);

        let noSleep = new NoSleep();
        noSleep.enable();
    }
    
    standby(){
        console.log('standby called');
        
        dp.game.currentIndex ++;
        if(dp.game.currentIndex >= dp.deck.length){
            Utils.shuffleArray(dp.deck);
            dp.game.currentIndex = 0;
        }
        

        const nextCardInfo = Utils.findObjectById(dp.assets.csv, dp.deck[dp.game.currentIndex]);
        const waitingDuration = this.diceNextInterval();
        console.log('waiting...' + waitingDuration/1000);
        

        const nextCard = this.addChild(new CardPreparer(waitingDuration, dp.deck[dp.game.currentIndex]));
        
        this.eventInterval = setTimeout(() => {
            if(nextCardInfo.event_trigger == 'onImmediateIntervention'){
                PIXI.sound.play('start_catch1');
            }else{
                PIXI.sound.play('start_catch1');
            }
            nextCard.onExecuteFX();
        }, waitingDuration);
    }

    initEndButton(){
        this.endButton = this.addChild(new PIXI.Container());
        this.endButton.zIndex = 10;
        
        this.background = GraphicsHelper.exDrawRoundedRect(0, 0, 250, 70, 15, false, {color:0xFFFFFF});
        this.background.alpha = 0.2;
        Utils.pivotCenter(this.background);
        this.endButton.addChild(this.background);
        this.backgroundRim = GraphicsHelper.exDrawRoundedRect(0, 0, 250, 70, 15, {color:0xFFFFFF, width:4}, false);
        this.backgroundRim.alpha = 0.5;
        Utils.pivotCenter(this.backgroundRim);
        this.endButton.addChild(this.backgroundRim);

        this.labelText = this.endButton.addChild(new PIXI.Text('ゲーム終了', {
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

        this.endButton.position.set(
            dp.stageRect.width - this.endButton.width / 2 - 20, 
            this.endButton.height / 2 + 20
        );

        this.endButton.cursor    = 'pointer';
        this.endButton.eventMode = 'static';
        const onTap = (e) => {
            this.readyToDie();
        };

        this.endButton.on('pointertap', onTap);
    }

    readyToDie(){
        clearTimeout(this.eventInterval);
        this.parent.initGameContainer();
        this.removeChildren();
        this.parent.removeChild(this);
    }

    initCardView(){
        this.addChild(new CardView());
    }
    

    diceNextInterval(){
        const secRange = dp.game.randomInterval;
        const minSec = dp.game.minInterval;
        const randomSec = Math.round(Math.random() * secRange);
        
        const finalSec = (minSec + randomSec) * 1000;
        return finalSec;
    }
}