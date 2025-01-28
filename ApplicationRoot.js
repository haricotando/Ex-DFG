import { dataProvider, dp } from "./dataProvider.js";
import { AssetLoader } from "./AssetLoader.js";
import { Instruction } from "./Instruction.js";
import { GameContainer } from "./GameContainer.js";

export class ApplicationRoot extends PIXI.Container {
    
    constructor() {
        super();
        this.init();
        this.loadAssets();
    }
    
    loadAssets(){
        const assetLoader = this.addChild(new AssetLoader());
        assetLoader.x = dp.stageRect.halfWidth;
        assetLoader.y = dp.stageRect.halfHeight-40;
        // Utils.layoutCenter(assetLoader, dp.stageRect);
        
        assetLoader.on('onComplete', (data) => {
            gsap.timeline({delay: 0.3})
                .to(assetLoader, {alpha:0, duration: 0.2, ease:'none'})
                .call(()=>{
                    this.removeChild(assetLoader);
                    this.addChild(new Instruction());
                    // this.initGameContainer();
                });
        });
    }

    initGameContainer(){
        this.addChild(new GameContainer());
    }


    init(){
    }
}