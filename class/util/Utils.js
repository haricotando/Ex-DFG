import { dataProvider, dp } from "../../dataProvider.js";
import GraphicsHelper from "../helper/GraphicsHelper.js";
import { UIKitSlider } from "../ui/UIKitSlider.js";
import { UIKitToggleButton } from "../ui/UIKitToggleButton.js";

class Utils {
    static hello(){
        console.log('hello');
    }

    /** ============================================================
     * 環境変数系
     */
    /** ------------------------------------------------------------
     * 実行環境がモバイルデバイスかどうかの判別（タブレットはモバイルに含めない）
     * @returns {boolean}
     */
    static isMobileDevice(){
        return navigator.userAgent.match(/iPhone|Android.+Mobile/) ? true : false;
    }

    /** ------------------------------------------------------------
     * 実行されているURLがgithubかどうかの判別
     * @returns {boolean}
     */
    static isOnGithub() {
        const hostname = window.location.hostname;
        return hostname.endsWith('.github.io');
    }




    /** ============================================================
     * Math / Conversion
     */
    /** ------------------------------------------------------------
     * 小数点以下を指定桁数に整える、toFixedと異なり .00 など省略する
     * @param {number} number - 対象の値
     * @param {number} digit - 丸める小数点桁数
     * @return {number}
     * 
     * @example
     * const val = 1,1111
     * Utils.roundTo(val, 2);
     *  -> return
     *      1.11
     */
    static roundTo(number, digit){
        return parseFloat(number.toFixed(digit));
    }

    /** ------------------------------------------------------------
     * 素数判定
     * @param {number} n - 判定する数字
     * @return {Boolean}
     */
    static isPrime(n){
        if (n <= 1) return false;
        if (n === 2 || n === 3) return true;
        if (n % 2 === 0) return false;
        const limit = Math.floor(Math.sqrt(n));
        for (let i = 3; i <= limit; i += 2) {
            if (n % i === 0) {
                return false;
            }
        }
        return true;
    }

    /** ------------------------------------------------------------
     * 画像のリサイズ / レート計算
     * @param {object} image - 元の画像サイズオブジェクト { width: number, height: number }
     * @param {object} frame - 枠のサイズオブジェクト { width: number, height: number }
     * @param {string} option - リサイズオプション "fit", "contain", "cover"
     * @returns {object} - リサイズ後の幅と高さ { width: number, height: number }
     */
    static calcScaleToFrame(image, frame, option = 'cover'){
        let newWidth, newHeight;
        const imgAspectRatio = image.width / image.height;
        const frameAspectRatio = frame.width / frame.height;

        switch (option) {
            case "fit":  // A: 比率無視で枠にフィット
                newWidth = frame.width;
                newHeight = frame.height;
                break;
            
            case "contain":  // B: 比率維持で枠内に収める（余白あり）
                if (imgAspectRatio > frameAspectRatio) {
                    newWidth = frame.width;
                    newHeight = frame.width / imgAspectRatio;
                } else {
                    newWidth = frame.height * imgAspectRatio;
                    newHeight = frame.height;
                }
                break;
            
            case "cover":  // C: 比率維持で枠を完全に埋める（余白なし）
                if (imgAspectRatio > frameAspectRatio) {
                    newWidth = frame.height * imgAspectRatio;
                    newHeight = frame.height;
                } else {
                    newWidth = frame.width;
                    newHeight = frame.width / imgAspectRatio;
                }
                break;

            default:
                throw new Error("Invalid option. Use 'fit', 'contain', or 'cover'.");
        }
        
        return { width: newWidth, height: newHeight };
    }

    /** ------------------------------------------------------------
     * DegreesをRadiansに変換する関数
     * @param {number} degrees - 角度（度）
     * @return {number} - ラジアン値
     */
    static degreesToRadians(degrees) {
        return degrees * (Math.PI / 180);
    }
    /** ------------------------------------------------------------
     * RadiansをDegreesに変換する関数
     * @param {number} radians - ラジアン値
     * @return {number} - 角度（度）
     */
    static radiansToDegrees(radians){
        return radians * (180 / Math.PI);
    }

    /** ------------------------------------------------------------
     * 180度反転した値を返す関数
     * @param {number} degrees - 角度（度）
     * @returns 180度反対側の値
    */
    static getOppositeDegrees(degrees){
        return (degrees + 180) % 360;
    }
    
    /** ------------------------------------------------------------
     * 数字をパーセンテージ文字列に変換する関数
     * @param {number} num - 変換したい数値
     * @param {number} decimals - 小数点以下の桁数（省略可能）
     * @returns {string} - パーセンテージ表記の文字列
     */
    static toPercentage(num, decimals = 0) {
        if (typeof num !== 'number') {
        throw new Error('引数は数値である必要があります');
        }
        // パーセンテージ計算と小数点の桁数調整
        const percentage = (num * 100).toFixed(decimals);
        return `${percentage}%`;
    }  




    /** ============================================================
     * 配列／オブジェクト
     */
    /** ------------------------------------------------------------
     * 配列をシャッフルする、破壊的変更
     * @param {array} array - シャッフル対象の配列
     */
    static shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    /** ------------------------------------------------------------
     * 配列内のObject.id をキーに検索する
     * @param {array} array - 走査対象の配列
     * @param {number} id - idの値
     * @returns 該当の配列
    */
    static findObjectById(array, id) {
        return array.find(obj => obj.id === id);
    }
    
    /** ------------------------------------------------------------
     * 配列内のObject.XX キーを指定して検索する
     * @param {array} array - 走査対象の配列
     * @param {string} key - 検索キー
     * @param {number or string, any} value - 検索の値
     * @returns 該当の配列
     */
    static findObjectByKey(array, key, value) {
        return array.find(obj => obj[key] === value);
    }



    /** ============================================================
     * PIXIJS / Layout, Resize
     */
    /** ------------------------------------------------------------
     * 
     * @param {displayObject} displayObject - ターゲットオブジェクト
     * @param {string} position - 9点ポジション（top-left, center, bottom-right)
     * @param {object} margins - {left:5, right:5, top:5, bottom:5}
     */
    static staticLayout(displayObject, position, margins = {}){
        const calculatePosition = (position, margins) => {
            const screenWidth = dp.app.renderer.width;
            const screenHeight = dp.app.renderer.height;
            
            const ml = (margins.left || 0) / 100;
            const mr = (margins.right || 0) / 100;
            const mt = (margins.top || 0) / 100;
            const mb = (margins.bottom || 0) / 100;
        
            switch(position) {
                case 'top-left':
                    return { x: screenWidth * ml, y: screenHeight * mt };
                case 'top':
                    return { x: screenWidth / 2, y: screenHeight * mt };
                case 'top-right':
                    return { x: screenWidth - (screenWidth * mr), y: screenHeight * mt };
                case 'left':
                    return { x: screenWidth * ml, y: screenHeight / 2 };
                case 'center':
                    return { x: screenWidth / 2, y: screenHeight / 2 };
                case 'right':
                    return { x: screenWidth - (screenWidth * mr), y: screenHeight / 2 };
                case 'bottom-left':
                    return { x: screenWidth * ml, y: screenHeight - (screenHeight * mb) };
                case 'bottom':
                    return { x: screenWidth / 2, y: screenHeight - (screenHeight * mb) };
                case 'bottom-right':
                    return { 
                        x: screenWidth - (screenWidth * mr), 
                        y: screenHeight - (screenHeight * mb) 
                    };
                default:
                    return { x: 0, y: 0 };
            }
        }
        const { x, y } = calculatePosition(position, margins);
        displayObject.x = x;
        displayObject.y = y;
    }

    /** ------------------------------------------------------------
     * @param {displayObject} target - PIXI.DisplayObject
     * @param {rectangle} parentRect - Rectangle
     */
    static layoutCenter(target, parentRect){
        target.x = parentRect.width / 2;
        target.y = parentRect.height / 2;
    }


    /** ------------------------------------------------------------
     * calcScaleToFrameのラッパー / 画像をリサイズする関数
     * @param {object} image - 元の画像サイズオブジェクト { width: number, height: number }
     * @param {object} frame - 枠のサイズオブジェクト { width: number, height: number }
     * @param {string} option - リサイズオプション "fit", "contain", "cover"
     */
    static resizeImage(image, frame, option = 'cover'){
        const res = this.calcScaleToFrame(image, frame, option);
        image.width = res.width;
        image.height = res.height;
    }

    /** ------------------------------------------------------------
     * PIXI.DisplayObject（Container, Sprite, Graphics etc...）のpivotのラッパー
     * @param {PIXI.DisplayObject} target - 対象のDisplayObject
     * @param {bool} soundRound - 小数点の四捨五入
     * 
     * @example
     * targetを中央揃え（pivot=0.5）にして、小数点が発生しても丸めない
     * 
     * const target = this.addChild(new PIXI.Graphics());
     * Utils.pivotCenter(target);
     */
    static pivotCenter(target, shouldRound = false){
        if(shouldRound){
            target.pivot.x = Math.round(target.width / 2);
            target.pivot.y = Math.round(target.height / 2);
        }else{
            target.pivot.x = target.width / 2;
            target.pivot.y = target.height / 2;
        }
    }

    /** ------------------------------------------------------------
     * 対象のx,y,w, h, scaleを snapshotオブジェクトに格納する
     * @param {displayObject} target - スナップショット対象
     */
    static snapshotPos(target){
        target.snapshot = {
            x     : target.x,
            y     : target.y,
            width : target.width,
            height: target.height,
            scale : target.scale,
        };
    }

    /** ------------------------------------------------------------
     * @param {displayObject} target - remove対象
     */
    static suicide(target, forceDestroy = false){
        if(forceDestroy){
            target.children.forEach((child) => child.destroy());
        }
        target.removeChildren();
        target.parent.removeChild(target);
    }




    /** ============================================================
     * PIXIJS / その他
     */
    /** ------------------------------------------------------------
     * ベースTextStyleから複製して使い回す
     * @param {PIXI.TextStyle} originalStyle - コピー元スタイル 
     * @param {*} opt - 変更・追加要素
     * @returns - コピーとオプションを反映したスタイル
     * 
     * @example
     * const cloned = Utils.cloneTextStyle(style, {fontSize: 100});
     *  -> return
     *      PIXI.TextStyle
     */
    static cloneTextStyle(originalStyle, opt) {
        const cloned = new PIXI.TextStyle(JSON.parse(JSON.stringify(originalStyle)));
        if(opt){
            for (const key in opt) {
                cloned[key] = opt[key];
            }
        }
        return cloned;
    }




    /** ============================================================
     * Snippets
     */

    /** ------------------------------------------------------------
     * 
     * @param {string} url - キャッシュを追加するURL
     * @returns キャッシュバスターを追加したURL
     */
    static addCacheBuster(url) {
        const cacheBuster = `cachebuster=${new Date().getTime()}`;
        if (url.includes('?')) {
            return `${url}&${cacheBuster}`;
        } else {
            return `${url}?${cacheBuster}`;
        }
    }




    /** ============================================================
     * 自作ライブラリのラッパー
     */
    /** ------------------------------------------------------------
     * UISliderKit のインスタンス作成とイベント設定を簡易にする
     * @param {PIXI.Application} app - PIXIアプリのインスタンス
     * @param {number} sliderWidth - 作成するSliderの幅
     * @param {object} targetObject - 対象オブジェクト
     * @param {string} keyString - 対象パラメータ名
     * @param {number} minVal - スライダー最小時の値
     * @param {number} maxVal - スライダー最大時の値
     * @param {number} [defaultVal=minVal] - デフォルトの値、指定がなければ最小値
     * @param {string} label - ラベルを付ける場合
     * @returns 
     * 
     * @example
     * DisplacementFilterのscale調整スケールの作成
     * 0 to 200、デフォルト100
     * 
     * const slider = Utils.addUISlider(dp.app, dataProvider.spRect.width, displacementFilter, 'scale', 0, 200, 100, 'Filter');
     * this.addChild(displacementSlider);
     * 
     */
    static addUISlider(app, sliderWidth, targetObject, keyString, minVal, maxVal, defaultVal = minVal, label){
        const slider = new UIKitSlider(app, sliderWidth, minVal, maxVal, defaultVal, label);
        slider.on('customEvent', (data) => {
            /**
             * scale.x,y だけのための分岐で気持ち悪いがとりあえずこれで
             */

            if (/^(scale|tileScale)$/.test(keyString)) {
                targetObject[keyString].x = data.value;
                targetObject[keyString].y = data.value;
            }else{
                targetObject[keyString] = data.value;
            }
        });
        return slider;
    }

    /** ------------------------------------------------------------
     * UIToggleButton のインスタンス作成とイベント設定を簡易にする
     * @param {PIXI.Application} app - PIXIアプリのインスタンス
     * @param {object} targetObject - 対象オブジェクト
     * @param {string} keyString - 対象パラメータ名
     * @param {bool} defaultVal - デフォルトの値
     * @param {string} label - ラベルをつける場合
     * @returns 
     * 
     * @example
     * const toggle = Utils.addUIToggleButton(dp.app, background, 'visible', true, 'background');
     * this.addChild(toggle);
     */
    static addUIToggleButton(app, targetObject, keyString, defaultVal = false, label = false){
        const button = new UIKitToggleButton(app, defaultVal, label);
        button.on('customEvent', (data) => {
            targetObject[keyString] = data.value;
        });
        return button;
    }
}

export default Utils;