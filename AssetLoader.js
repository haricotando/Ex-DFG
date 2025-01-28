import Utils from "./class/util/Utils.js";
import { dataProvider, dp } from "./dataProvider.js";

export class AssetLoader extends PIXI.Container {
    
    constructor() {
        super();

        this._valLoaded = 0;
        this._loaded = 0;
        this.isAssetLoaded = false;

        this.labelContainer = this.addChild(new PIXI.Container());

        this.labelPercent = this.addChild(new PIXI.Text("...", {
            fontFamily: 'Inter', 
            fontWeight: 200,
            fontSize: 100, fill: 0x545550,
        }));
        this.labelPercent.anchor.set(0.5);

        this.labelAdditional = this.addChild(new PIXI.Text("", {
            fontFamily: 'Inter', 
            fontWeight: 400,
            fontSize: 30, fill: 0x545550,
        }));
        this.labelAdditional.anchor.set(0.5);
        this.labelAdditional.y = 70;
        
        this.addAssets();
    }
    
    /**
     * アセット登録
     */
    addAssets(){
        PIXI.Assets.add('game_in_progress', './assets/game_in_progress.png');
        PIXI.Assets.add('flip_card', './assets/flip_card.png');
        PIXI.Assets.add('standby', './assets/standby.png');
        PIXI.Assets.add('description_bg', './assets/description_bg.png');
        PIXI.Assets.add('card_back', './assets/card_back.png');

        PIXI.Assets.add('animal1', './assets/card/animal1.png');
        PIXI.Assets.add('animal2', './assets/card/animal2.png');
        PIXI.Assets.add('banana_slip1', './assets/card/banana_slip1.png');
        PIXI.Assets.add('burst1', './assets/card/burst1.png');
        PIXI.Assets.add('burst2', './assets/card/burst2.png');
        PIXI.Assets.add('burst3', './assets/card/burst3.png');
        PIXI.Assets.add('burst4', './assets/card/burst4.png');
        PIXI.Assets.add('burst5', './assets/card/burst5.png');
        PIXI.Assets.add('cardpick1', './assets/card/cardpick1.png');
        PIXI.Assets.add('cardpick2', './assets/card/cardpick2.png');
        PIXI.Assets.add('cardtake1', './assets/card/cardtake1.png');
        PIXI.Assets.add('change_deck1', './assets/card/change_deck1.png');
        PIXI.Assets.add('fallgirl1', './assets/card/fallgirl1.png');
        PIXI.Assets.add('fallgirl2', './assets/card/fallgirl2.png');
        PIXI.Assets.add('fallguy1', './assets/card/fallguy1.png');
        PIXI.Assets.add('fallguy2', './assets/card/fallguy2.png');
        PIXI.Assets.add('hand1', './assets/card/hand1.png');
        PIXI.Assets.add('hand2', './assets/card/hand2.png');
        PIXI.Assets.add('heart_and_spead1', './assets/card/heart_and_spead1.png');
        PIXI.Assets.add('in_hell1', './assets/card/in_hell1.png');
        PIXI.Assets.add('in_hell2', './assets/card/in_hell2.png');
        PIXI.Assets.add('in_hell3', './assets/card/in_hell3.png');
        PIXI.Assets.add('in_sky1', './assets/card/in_sky1.png');
        PIXI.Assets.add('in_sky2', './assets/card/in_sky2.png');
        PIXI.Assets.add('in_sky3', './assets/card/in_sky3.png');
        PIXI.Assets.add('joker_dark1', './assets/card/joker_dark1.png');
        PIXI.Assets.add('joker_shine1', './assets/card/joker_shine1.png');
        PIXI.Assets.add('joker1', './assets/card/joker1.png');
        PIXI.Assets.add('joker2', './assets/card/joker2.png');
        PIXI.Assets.add('joker3', './assets/card/joker3.png');
        PIXI.Assets.add('joker4', './assets/card/joker4.png');
        PIXI.Assets.add('justice1', './assets/card/justice1.png');
        PIXI.Assets.add('justice2', './assets/card/justice2.png');
        PIXI.Assets.add('lock1', './assets/card/lock1.png');
        PIXI.Assets.add('lock2', './assets/card/lock2.png');
        PIXI.Assets.add('lock3', './assets/card/lock3.png');
        PIXI.Assets.add('nagative_card1', './assets/card/nagative_card1.png');
        PIXI.Assets.add('offercard1', './assets/card/offercard1.png');
        PIXI.Assets.add('offercard2', './assets/card/offercard2.png');
        PIXI.Assets.add('peace1', './assets/card/peace1.png');
        PIXI.Assets.add('person_duo1', './assets/card/person_duo1.png');
        PIXI.Assets.add('person_trio1', './assets/card/person_trio1.png');
        PIXI.Assets.add('person_trio2', './assets/card/person_trio2.png');
        PIXI.Assets.add('revo1', './assets/card/revo1.png');
        PIXI.Assets.add('revo2', './assets/card/revo2.png');
        PIXI.Assets.add('spining1', './assets/card/spining1.png');
        PIXI.Assets.add('spot1', './assets/card/spot1.png');
        PIXI.Assets.add('spot2', './assets/card/spot2.png');
        PIXI.Assets.add('worker1', './assets/card/worker1.png');
        PIXI.Assets.add('worker2', './assets/card/worker2.png');

        PIXI.Assets.add('1tick1', './assets/snd/1tick1.m4a');
        PIXI.Assets.add('1tick2', './assets/snd/1tick2.m4a');
        PIXI.Assets.add('1tick3', './assets/snd/1tick3.m4a');
        // PIXI.Assets.add('1tick4', './assets/snd/1tick4.m4a');
        PIXI.Assets.add('start_catch1', './assets/snd/start_catch1.mp3');
        // PIXI.Assets.add('start_catch2', './assets/snd/start_catch2.mp3');
        // PIXI.Assets.add('insight2', './assets/snd/insight2.mp3');
        PIXI.Assets.add('pop1', './assets/snd/pop1.mp3');
        PIXI.Assets.add('pop2', './assets/snd/pop2.mp3');
        
        this._assetsLoad = [
            'game_in_progress',
            'flip_card',
            'standby',
            'description_bg',
            'card_back',

            'animal1',
            'animal2',
            'banana_slip1',
            'burst1',
            'burst2',
            'burst3',
            'burst4',
            'burst5',
            'cardpick1',
            'cardpick2',
            'cardtake1',
            'change_deck1',
            'fallgirl1',
            'fallgirl2',
            'fallguy1',
            'fallguy2',
            'hand1',
            'hand2',
            'heart_and_spead1',
            'in_hell1',
            'in_hell2',
            'in_hell3',
            'in_sky1',
            'in_sky2',
            'in_sky3',
            'joker_dark1',
            'joker_shine1',
            'joker1',
            'joker2',
            'joker3',
            'joker4',
            'justice1',
            'justice2',
            'lock1',
            'lock2',
            'lock3',
            'nagative_card1',
            'offercard1',
            'offercard2',
            'peace1',
            'person_duo1',
            'person_trio1',
            'person_trio2',
            'revo1',
            'revo2',
            'spining1',
            'spot1',
            'spot2',
            'worker1',
            'worker2',

            '1tick1',
            '1tick2',
            '1tick3',
            // '1tick4',
            'start_catch1',
            // 'start_catch2',
            // 'insight2',
            'pop1',
            'pop2',
        ];

        const onProgress = (e) => {
            this.labelPercent.text = `${Math.round(e * 100)}%`;
        }

        const assetsPromise = PIXI.Assets.load(this._assetsLoad, onProgress);
        
        assetsPromise.then((items) => {
            dp.assets = items;
            this.isAssetLoaded = true;
            this.labelAdditional.text = 'CSV LOADING...';
            this.loadCSV();
        });
    }

    /**
     * 固有追加
     */
    loadCSV(){
        const _this = this;
        const ssURL = Utils.addCacheBuster(dp.csvPath);
        
        const parseCSV = (data) => {
            this.labelAdditional.text = 'CSV PARSING...';
            const rows = [];
            let currentRow = [];
            let insideQuote = false;
            let field = '';
            for (let i = 0; i < data.length; i++) {
                const char = data[i];
                const nextChar = data[i + 1];
                if (char === '"' && nextChar === '"') {
                // ダブルクォートのエスケープ処理
                    field += '"';
                    i++;
                } else if (char === '"') {
                    // フィールド内外の切り替え
                    insideQuote = !insideQuote;
                } else if (char === ',' && !insideQuote) {
                    // フィールドの終了
                    currentRow.push(field);
                    field = '';
                } else if (char === '\n' && !insideQuote) {
                    // 行の終了
                    currentRow.push(field);
                    rows.push(currentRow);
                    currentRow = [];
                    field = '';
                } else {
                    // フィールドに文字を追加
                    field += char;
                }
            }
            // 最後の行を追加
            if (field || currentRow.length > 0) {
                currentRow.push(field);
                rows.push(currentRow);
            }
            return rows;
        }

        async function fetchSpreadsheetData() {
            try {
                const response = await fetch(ssURL);
                const text = await response.text();
                // 行を分割しつつ、改行を含むフィールドを結合
                const rows = parseCSV(text);
                // 最初の行をキーとして使用
                const keys = rows[0];
                // データ部分を構造体に変換
                const result = rows.slice(1).map(row => {
                const entry = {};
                keys.forEach((key, index) => {
                    entry[key.trim()] = key === 'quantity'
                    ? Number(row[index]?.trim() || 0)
                    : (row[index]?.trim() || '');
                });
                return entry;
            });
            dp.assets.csv = result;
            _this.initDeck();
            } catch (error) {
                console.error(error);
            }
        }
        fetchSpreadsheetData();
    }

    initDeck(){
        for(let i = 0; i<dp.assets.csv.length; i++){
            dp.introDeck.push(dp.assets.csv[i].id);
            for(let ii = 0; ii<dp.assets.csv[i].quantity; ii++){
                dp.deck.push(dp.assets.csv[i].id);
            }
        }

        Utils.shuffleArray(dp.deck);

        dp.assets.csv.push(
            {
                id: "0", 
                name: " ", 
                description: "混沌の本質\nそれは公平だ", 
                // description: "人間の最高の力は\n計画が崩れたときに何をするかだ", 
                quantity: 0,
                asset_id: "joker4"}
        );

        this.emit("onComplete", { 
            isAssetLoaded : true,
            message: "アセット読み込み完了"
        });
    }
}