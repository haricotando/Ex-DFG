export const dataProvider = {
    // 後から定義でも良いがコード保管のために undefined で定義だけする
    app: undefined,

    csvPath: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSVpd6cRhO06VvJwfe9sxmHbNnvq3njUftZlc49BUgkHh25ZDnHi5oh8M4XS0VnntxiW8Ha0ceHODXs/pub?gid=0&single=true&output=csv',

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
        minInterval   : 30,
        randomInterval: 30,
        // minInterval   : 3,
        // randomInterval: 3,
        showCountdown : false,
    },

    cardList : [],
    deck     : [],
    introDeck: [],

    textStyle   : {},
    colorPalette: {},
};

export const dp = dataProvider;