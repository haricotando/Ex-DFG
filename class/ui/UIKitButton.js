import Utils from '../util/Utils.js';

export class UIKitButton extends PIXI.Container {
    /**
     * 
     * @param {PIXI.Application} app - PIXIアプリのインスタンス
     * @param {bool} bool - デフォルトの値
     */

    constructor(app, label = false) {
        super();

        app.stage.hitArea = app.screen;

        const baseSize = 64;
        const offset = 2;

        const background = new PIXI.Graphics().lineStyle(2, 0xD9D9D9).beginFill(0xFFFFFF).drawRoundedRect(0, 0, baseSize * 4, baseSize, baseSize / 4);
        this.addChild(background);
        background.cursor = 'pointer';
        background.eventMode = 'static';

        if(label !== false){
            const valText = this.addChild(new PIXI.Text(label, {
                fontSize: 25, fill: 0x000000,
            }));
            valText.anchor.set(0.5, 0.5);
            valText.x = baseSize * 2;
            valText.y = baseSize / 2;
        }
        
        const onToggle = (e) => {
            background.alpha = 0.5;
            this.emit("customEvent", { 
                value  : this.val,
                message: "イベントが発火されました！"
            });
        }

        const onRelease = (e) => {
            background.alpha = 1;
        }
        
        background.on('pointerdown', onToggle).on('pointerup', onRelease).on('pointerupoutside', onRelease);
    }
}