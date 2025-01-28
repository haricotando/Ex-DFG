import { dataProvider, dp } from "./dataProvider.js";
import GraphicsHelper from "./class/helper/GraphicsHelper.js";
import Utils from "./class/util/Utils.js";

export class Card extends PIXI.Container {
    
    constructor(id) {
        super();
        id = id.toString();
        if(id == 'card_back'){
            this.initCardBack();
        }else{
            this.initCardFace(id);
        }

    }

    initCardBack(){
        const rimMargin = 50;
        const cardContainer = this.addChild(new PIXI.Container());
        const cardBG = cardContainer.addChild(GraphicsHelper.exDrawRoundedRect(0, 0, dp.stageRect.width, 1668, 50, false, {color: 0xEEE0D3}));
        Utils.pivotCenter(cardContainer);
        
       const imageMask = cardContainer.addChild(GraphicsHelper.exDrawRoundedRect(0, 0, dp.stageRect.width - rimMargin * 2, 1668 - rimMargin * 2, 30, false, {color: 0xFF0000, alpha:0.5}));
        imageMask.position.set(rimMargin, rimMargin);

        const cardImage = PIXI.Sprite.from(dataProvider.assets.card_back);
        cardContainer.addChild(cardImage);
        cardImage.position.set(rimMargin, rimMargin);
        Utils.resizeImage(cardImage, imageMask, 'fit');
        cardImage.mask = imageMask;

        /**
         * inner frame
         */        
        const innerFrame = cardContainer.addChild(GraphicsHelper.exDrawRoundedRect(0, 0, dp.stageRect.width - rimMargin * 2, 1668 - rimMargin * 2, 30, {color: 0x333333, width:20, alignment:0}, false));
        innerFrame.position.set(rimMargin, rimMargin);

        const innerFrame2 = cardContainer.addChild(GraphicsHelper.exDrawRoundedRect(0, 0, dp.stageRect.width - rimMargin * 2, 1668 - rimMargin * 2, 30, {color: 0xEFEFEF, width:10, alignment:0}, false));
        innerFrame2.position.set(rimMargin, rimMargin);
    }



    initCardFace(id){
        const myData = Utils.findObjectByKey(dp.assets.csv, 'id', id);

        const rimMargin = 50;

        /**
         * container
         */
        const cardContainer = this.addChild(new PIXI.Container());
        const cardBG = cardContainer.addChild(GraphicsHelper.exDrawRoundedRect(0, 0, dp.stageRect.width, 1668, 50, false, {color: 0xEEE0D3}));
        
        Utils.pivotCenter(cardContainer);
        
        /**
         * image mask
        */
       const imageMask = cardContainer.addChild(GraphicsHelper.exDrawRoundedRect(0, 0, dp.stageRect.width - rimMargin * 2, 1668 - rimMargin * 2, 30, false, {color: 0xFF0000, alpha:0.5}));
        imageMask.position.set(rimMargin, rimMargin);

        /**
         * image
         */
        const cardImage = PIXI.Sprite.from(dataProvider.assets[myData.asset_id]);
        cardContainer.addChild(cardImage);
        cardImage.position.set(rimMargin, rimMargin);
        Utils.resizeImage(cardImage, imageMask, 'contain');
        cardImage.mask = imageMask;
        
        /**
         * descriptionの背景画像
         */
        const descriptionBG = PIXI.Sprite.from(dataProvider.assets.description_bg);
        cardContainer.addChild(descriptionBG);
        descriptionBG.x = imageMask.x;
        descriptionBG.y = imageMask.y + cardImage.height;
        descriptionBG.width = imageMask.width;
        descriptionBG.height = cardBG.height - cardImage.height - rimMargin * 2;

        /**
         * inner frame
         */        
        // const innerFrame = cardContainer.addChild(GraphicsHelper.exDrawRoundedRect(0, 0, dp.stageRect.width - rimMargin * 2, dp.stageRect.height - rimMargin * 2, 30, {color: 0x333333, width:20}, false));
        const innerFrame = cardContainer.addChild(GraphicsHelper.exDrawRoundedRect(0, 0, dp.stageRect.width - rimMargin * 2, 1668 - rimMargin * 2, 30, {color: 0x333333, width:20, alignment:1}, false));
        innerFrame.position.set(rimMargin, rimMargin);

        const innerFrame2 = cardContainer.addChild(GraphicsHelper.exDrawRoundedRect(0, 0, dp.stageRect.width - rimMargin * 2, 1668 - rimMargin * 2, 30, {color: 0xEFEFEF, width:10, alignment:1}, false));
        innerFrame2.position.set(rimMargin, rimMargin);




        const textName = cardContainer.addChild(new PIXI.Text("...", {
            fontFamily: 'Kaisei Decol', 
            fontWeight: 700,
            fontSize: 200, fill: 0xEFEFEF,
            align: 'center',
            breakWords: true,
            wordWrap: true,
            wordWrapWidth: cardImage.width - 30,
            dropShadow: true,
            dropShadowColor: '#000000',
            dropShadowAlpha: 0.9,
            dropShadowBlur: 16,
            dropShadowAngle: 0,
            dropShadowDistance: 0,
            
        }));
        textName.anchor.set(0.5, 0);
        textName.text = myData.name;
        textName.position.set(dp.stageRect.halfWidth, 200);



        const textDescription = cardContainer.addChild(new PIXI.Text("...", {
            fontFamily: 'Kaisei Decol', 
            fontWeight: 300,
            fontSize: 60, fill: 0xEFEFEF,
            align: 'center',
            breakWords: true,
            wordWrap: true,
            wordWrapWidth: cardImage.width - 100,
            lineHeight: 80,
            
            dropShadow: true,
            dropShadowColor: '#000000',
            dropShadowAlpha: 0.5,
            dropShadowBlur: 8,
            dropShadowAngle: 0,
            dropShadowDistance: 0,
        }));
        textDescription.anchor.set(0.5, 0.5);
        textDescription.text = this.replacePlaceholdersWithErrors(myData.description);
        textDescription.position.set(dp.stageRect.halfWidth, descriptionBG.y + descriptionBG.height / 2);
    }

    replacePlaceholdersWithErrors(text) {
        const cardMap = {
            1: 'A',
            11: 'J',
            12: 'Q',
            13: 'K'
        };
    
        const replacedText = text.replace(/<number>/g, () => {
            const number = Math.floor(Math.random() * 13) + 1;
    
            if (cardMap[number]) {
                return cardMap[number];
            } else if (number >= 2 && number <= 10) {
                return number.toString();
            } else {
                return '{number}'; // 置き換えせずに残す
            }
        });
    
        return replacedText;
    }
}