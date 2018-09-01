/*
 * Created on Sun Jun 03 2018
 *
 * Copyright (c) 2018 Youke Xiang
 */

class Color {
    hexColor;
    r;
    g;
    b;

    constructor(hexColor) {
        this.hexColor = hexColor;
        hexColor = this.hexColor.replace('#', '');
        this.r = this._getR(hexColor);
        this.g = this._getG(hexColor);
        this.b = this._getB(hexColor);
    }

    _getR(hex) {
        return parseInt(hex.length == 3 ? hex.slice(0, 1).repeat(2) : hex.slice(0, 2), 16);
    }

    _getG(hex) {
        return parseInt(hex.length == 3 ? hex.slice(1, 2).repeat(2) : hex.slice(2, 4), 16);
    }

    _getB(hex) {
        return parseInt(hex.length == 3 ? hex.slice(2, 3).repeat(2) : hex.slice(4, 6), 16);
    }

    toDarkerColor(number) {
        // TODO: make more dynamic
        let r = this.r - number;
        let g = this.g - number;
        let b = this.b - number;
        return 'rgb(' + r + ',' + g + ',' + b + ')';
    }

    toRGBA(opacity = 1) {
        return 'rgba(' + this.r + ',' + this.g + ',' + this.b + ',' + opacity + ')';
    }

    toHex() {
        return this.hexColor;
    }
}

export default Color;
