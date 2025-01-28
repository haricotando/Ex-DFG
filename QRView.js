import GraphicsHelper from "./class/helper/GraphicsHelper.js";
import Utils from "./class/util/Utils.js";
import { dataProvider, dp } from "./dataProvider.js";

export class QRView extends PIXI.Container {
    
    constructor() {
        super();
        this.sortableChildren = true;

        const qr = qrcode(0, 'M');
        qr.addData(window.location.href);
        qr.make();
        const qrDataURL = qr.createDataURL(10, 0);
        const texture = PIXI.Texture.from(qrDataURL);
        
        const qrContainer = new PIXI.Sprite(texture);
        qrContainer.x = dp.stageRect.halfWidth - 125;
        qrContainer.y = dp.stageRect.halfHeight - 125;
        this.addChild(qrContainer);
        qrContainer.zIndex = 10;
        qrContainer.alpha = 0;
        
        const bgContainer = this.addChild(new PIXI.Container());
        const bg = GraphicsHelper.exDrawRect(0, 0, 125 * 2 + 20, 125 * 2 + 20, false, {color:0xFFFFFF});
        Utils.pivotCenter(bg);
        bgContainer.addChild(bg);
        bgContainer.x = dp.stageRect.halfWidth;
        bgContainer.y = dp.stageRect.halfHeight;
        bgContainer.alpha = 0;
        bgContainer.scale.set(1.2);

        gsap.timeline()
            .to(bgContainer.scale, {x:1, y:1, duration:0.3, ease:'expo.out'})
            .to(bgContainer, {alpha:1, duration:0.2, ease:'none'}, '<')
            // .to(qrContainer.scale, {x:1, y:1, duration:0.3, ease:'back.out(0.4)'}, '<')
            .to(qrContainer, {alpha:1, duration:0.2, ease:'none'}, '<0.1')

    }
}