import { dataProvider, dp } from "./dataProvider.js";
import GraphicsHelper from "./class/helper/GraphicsHelper.js";
import { CommonButton } from "./CommonButton.js";
import Utils from "./class/util/Utils.js";
import { CardView } from "./CardView.js";

export class Instruction extends PIXI.Container {
    
    constructor() {
        super();
        this.init();
    }

    init(){
        // const bg = this.addChild(GraphicsHelper.exDrawRect(0, 0, dp.stageRect.width, dp.stageRect.height, false, {color:0x000000}));
        const textTitle = this.addChild(new PIXI.Text("INSTRUCTION", {
            fontFamily: 'Inter', 
            fontWeight: 400,
            fontSize: 65, fill: 0xFEFEFE,
            letterSpacing: 15,
        }));
        textTitle.anchor.set(0.5, 0);
        textTitle.x = dp.stageRect.halfWidth;
        textTitle.y = 100;

        this.initButton();

        const textDescripton = this.addChild(new PIXI.Text("STUDY10「既存ゲームの拡張」\n既存ゲームの進行を外部から干渉しルールを変えていくことで見つかる\n面白さを検証するプロトタイピング\n\nこのブランチでは\n「大富豪」を拡張する\n\n1. 物理トランプを用意する\n2. カードを配る\n3. ローカルルールを確認する\n4. 「進む」を押す", {
            fontFamily: 'Kaisei Decol', 
            fontWeight: 700,
            fontSize: 50, fill: 0xFEFEFE,
            align: 'center',
            breakWords: true,
            wordWrap: true,
            wordWrapWidth: 800,
            lineHeight: 80,
        }));
        textDescripton.anchor.set(0.5, 0.5);
        textDescripton.x = dp.stageRect.halfWidth;
        const tdOffset =  (this.startButton.y - textTitle.y) / 2;
        textDescripton.y = textTitle.y + tdOffset;
        // textDescripton.y = 500;

    }
    
    initButton(){
        this.startButton = this.addChild(new CommonButton('進む'));
        this.startButton.x = dp.stageRect.halfWidth;
        this.startButton.y = dp.stageRect.height - (dp.stageRect.height / 10);
        
        this.startButton.cursor    = 'pointer';
        this.startButton.eventMode = 'static';
        const onTap = (e) => {
            this.startButton.eventMode = 'none';
            this.parent.initGameContainer();
            this.parent.removeChild(this);
        };

        this.startButton.on('pointertap', onTap);

    }
}