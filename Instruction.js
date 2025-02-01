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
        const bg = this.addChild(GraphicsHelper.exDrawRect(0, 0, dp.stageRect.width, dp.stageRect.height, false, {color:0x000000}));

        const titleContainer = this.addChild(new PIXI.Container());
        titleContainer.position.set(dp.stageRect.halfWidth, dp.stageRect.halfHeight/3);
        const textEx = titleContainer.addChild(new PIXI.Text("Ex-DFG", {
            fontFamily: 'Inter',
            fontWeight: 900,
            fontSize  : 300,
            fill      : 0x1A1F22,
            stroke: '#000000',
            strokeThickness: 4,
            
            letterSpacing: -40,
        }));
        textEx.anchor.set(0.5);

        this.initButton();

        const textDescripton = this.addChild(new PIXI.Text("「Ex大富豪」\nこのアプリは大富豪のルールを\n外部から拡張する\n（タイトルはそのうち綺麗にする）\n\n<遊び方＞\n物理トランプを用意する\n2. カードを配る\n3. ローカルルールを確認する\n4. 「進む」を押す", {
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
        const tdOffset =  (this.startButton.y - titleContainer.y) / 2;
        textDescripton.y = titleContainer.y + tdOffset;
        // textDescripton.y = 500;

    }
    
    initButton(){
        this.startButton = this.addChild(new CommonButton('進む'));
        Utils.staticLayout(this.startButton, 'bottom', {bottom: 10});
        
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