import GraphicsHelper from "./class/helper/GraphicsHelper.js";
import Utils from "./class/util/Utils.js";
import { dataProvider, dp } from "./dataProvider.js";

export class EventBlock extends PIXI.Container {
    
    constructor(onImmediateIntervention) {
        super();
        this.imageAsset = onImmediateIntervention ? dataProvider.assets.flip_card : dataProvider.assets.standby;
        const eventADescription = '＜即時イベント＞\n全員手を止める\n手番のプレイヤーがルールを確認\nルールは即反映される';
        const eventBDescription = '＜行動後イベント＞\n手番プレイヤーの行動後\n次にカードを出すプレイヤーが\nカードを出す前にルールを確認する';

        this.descripton = onImmediateIntervention ? eventADescription : eventBDescription;
        this.init();
    }

    init(){
        this.container = this.addChild(new PIXI.Container());
        // this.background = GraphicsHelper.exDrawRoundedRect(0, 0, dp.stageRect.width - 80, 240, 20, false, {color:0xFFFFFF});
        // this.background.alpha = 0.2;
        // Utils.pivotCenter(this.background);
        // this.container.addChild(this.background);
        this.backgroundRim = GraphicsHelper.exDrawRoundedRect(0, 0, dp.stageRect.width - 80, 240, 20, {color:0xFFFFFF, width:4}, false);
        this.backgroundRim.alpha = 0.5;
        Utils.pivotCenter(this.backgroundRim);
        this.container.addChild(this.backgroundRim);

        const eventTypeImage = PIXI.Sprite.from(this.imageAsset);
        // dataProvider.assets.standby
        eventTypeImage.anchor.set(0.5);
        eventTypeImage.width = eventTypeImage.height = 210;
        eventTypeImage.x = 0 - (dp.stageRect.width - 100) / 2 + 100 + 10;
        this.addChild(eventTypeImage);

        this.textDescripton = this.container.addChild(new PIXI.Text(this.descripton, 
        {
            fontFamily: 'Kaisei Decol', 
            fontWeight: 700,
            fontSize: 40, fill: 0xFEFEFE,
            // align: 'center',
            breakWords: true,
            wordWrap: true,
            wordWrapWidth: 670,
            lineHeight: 50,
        }));
        this.textDescripton.anchor.set(0, 0.5);
        this.textDescripton.x = - 210;
        // this.textDescripton.y = 120;

    }
}