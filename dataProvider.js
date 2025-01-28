export const dataProvider = {
    // 後から定義でも良いがコード保管のために undefined で定義だけする
    app: undefined,

    csvPath: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTG46XRL7bpMsWPWHyxBbXzDD17TkCtwicyOZVx03XywleKxopA4Sd1phRe-0oPfcV76NxEwhoJLpsb/pub?gid=0&single=true&output=csv',

    stageRect : {
        width             : undefined,
        height            : undefined,
        halfWidth         : undefined,
        halfHeight        : undefined,
        negativeWidth     : undefined,
        negativeHeight    : undefined,
        negativeHalfWidth : undefined,
        negativeHalfHeight: undefined,
    },

    assets: {},

    game: {
        currentIndex  : 0,
        nextInterval  : 0,
        minInterval   : 0,
        randomInterval: 0,
        showCountdown : true,
    },

    cardList : [],
    deck     : [],
    introDeck: [],

    textStyle   : {},
    colorPalette: {},
};

export const dp = dataProvider;