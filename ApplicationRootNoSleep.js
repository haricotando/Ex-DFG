import { dataProvider, dp } from "/dataProvider.js";
import GraphicsHelper from "/class/helper/GraphicsHelper.js";
import Utils from "/class/util/Utils.js";

export class ApplicationRootNoSleep extends PIXI.Container {
    
    constructor() {
        super();

        // this.initAssetLoader();
        this.init();
    }

    /** ------------------------------------------------------------
     * アセット読み込み時は initAssetLoader -> init
    */
    init(){
        const bg = this.addChild(GraphicsHelper.exDrawRect(0, 0, dp.stageRect.width, dp.stageRect.height, {color:0xFF00FF, width:2}, {color:0xEFEFEF}));
        
        /**
        * フォントのテスト
       */
        const textSample = this.addChild(new PIXI.Text("NoSleepJS", {
            fontFamily: 'Inter', 
            fontWeight: 700,
            fontSize: 65, fill: 0x545550,
            letterSpacing: 15,
        }));
        textSample.anchor.set(0.5, 0);
        textSample.x = dp.stageRect.halfWidth;
        textSample.y = 100;


        
        const button = this.addChild(new PIXI.Container());
        const background = button.addChild(GraphicsHelper.exDrawRect(0, 0, 200, 200, false, {color:0xFF0000}));
        const label = button.addChild(new PIXI.Text('> enable nosleep ', {fontFamily:'Inter', fontSize: 60, fontWeight: 500, fill:0xFFFFFF}));
        background.width = label.width;
        background.height = label.height;
        button.interactive = true;
        button.buttonMode = true;
        Utils.pivotCenter(button);
        button.x = dp.stageRect.halfWidth;
        button.y = 400;
    
        let wakeLockEnabled = false;
        let noSleep = new NoSleep();


        button.on("pointertap", () => {
            if (!wakeLockEnabled) {
                noSleep.enable();
                wakeLockEnabled = true;
                label.text = '> disable nosleep';
            }else{
                noSleep.disable();
                wakeLockEnabled = false;
                label.text = '> enable nosleep';
            }
        });

    }
    
    initAssetLoader(){
        PIXI.Assets.add('flowerTop', 'https://pixijs.com/assets/flowerTop.png');
        this._assetsLoad = [
            'flowerTop',
        ];
        this.loadAssets();
    }
}