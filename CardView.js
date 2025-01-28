import { dataProvider, dp } from "./dataProvider.js";
import { Card } from "./Card.js";
import Utils from "./class/util/Utils.js";
import GraphicsHelper from "./class/helper/GraphicsHelper.js";

export class CardView extends PIXI.Container {
    
    constructor() {
        super();
        this.cardId = 1;
        this.pastCard = undefined;
        this.sortableChildren = true;
        this.init();
        this.addCard();
        this.initEndButton();
    }

    init(){
        this.cursor = 'pointer';
        this.eventMode = 'static';
        const onTap = (e) => {
            this.cardId ++;
            
            if(Utils.findObjectByKey(dp.assets.csv, 'id', this.cardId.toString())){
                this.addCard()
            }

        
        };
        this.on('pointertap', onTap);
    };

    addCard(){
        const card = this.addChild(new Card(this.cardId));
        card.position.set(dp.stageRect.halfWidth, dp.stageRect.halfHeight);
        card.alpha = 0;
        card.scale.set(0.8);
        PIXI.sound.play('pop1');
        gsap.timeline({delay:0.1})
            .to(card.scale, {x:1, y:1, duration: 0.2, ease:'elastic.out(2)'})
            .to(card, {alpha:1, duration:0.2, ease:'none'}, '<');

        if(this.pastCard){
            this.removeChild(this.pastCard);
        }
        this.pastCard = card;
    }

    initEndButton(){
        this.endButton = this.addChild(new PIXI.Container());
        this.endButton.zIndex = 100;
        
        this.background = GraphicsHelper.exDrawRoundedRect(0, 0, 250, 70, 15, false, {color:0xFFFFFF});
        this.background.alpha = 0.2;
        Utils.pivotCenter(this.background);
        this.endButton.addChild(this.background);
        this.backgroundRim = GraphicsHelper.exDrawRoundedRect(0, 0, 250, 70, 15, {color:0xFFFFFF, width:4}, false);
        this.backgroundRim.alpha = 0.5;
        Utils.pivotCenter(this.backgroundRim);
        this.endButton.addChild(this.backgroundRim);

        this.labelText = this.endButton.addChild(new PIXI.Text('戻る', {
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
            this.parent.parent.initGameContainer();
            this.removeChildren();
            this.parent.removeChild(this);
        };

        this.endButton.on('pointertap', onTap);
    }
}