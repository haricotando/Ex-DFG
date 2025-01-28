import { dataProvider, dp } from "./dataProvider.js";
import GraphicsHelper from "./class/helper/GraphicsHelper.js";
import Utils from "./class/util/Utils.js";

export class CommonButton extends PIXI.Container {
    
    constructor(label) {
        super();

        this.button = this.addChild(new PIXI.Container());
        
        this.background = GraphicsHelper.exDrawRoundedRect(0, 0, dp.stageRect.width - 400, 150, 30, false, {color:0xFFFFFF});
        this.background.alpha = 0.2;
        Utils.pivotCenter(this.background);
        this.button.addChild(this.background);
        this.backgroundRim = GraphicsHelper.exDrawRoundedRect(0, 0, dp.stageRect.width - 400, 150, 30, {color:0xFFFFFF, width:4}, false);
        this.backgroundRim.alpha = 0.5;
        Utils.pivotCenter(this.backgroundRim);
        this.button.addChild(this.backgroundRim);

        this.labelText = this.button.addChild(new PIXI.Text(label, {
            fontFamily: 'Kaisei Decol', 
            fontWeight: 700,
            fontSize: 80, fill: 0xEFEFEF,
            dropShadow: true,
            dropShadowColor: '#000000',
            dropShadowAlpha: 0.9,
            dropShadowBlur: 16,
            dropShadowAngle: 0,
            dropShadowDistance: 0,
            
        }));
        this.labelText.anchor.set(0.5, 0.5);
    }

    activate(){
        gsap.timeline()
        .to(this.background, {alpha:0.8, duration:0.2, ease:'expo.out'}, '<')
        .to(this.backgroundRim.scale, {x:1.1, y:1.2, duration:0.2, ease:'expo.out'}, '<')
        .to(this.background.scale, {x:1.1, y:1.2, duration:0.2, ease:'expo.out'}, '<')
        .to(this.labelText.scale, {x:0.7, y:0.7, duration:0.3, ease:'back.out(2)'}, '<')
        .to(this, {alpha:0, duration:0.2, ease:'none'}, '<')
    }
}