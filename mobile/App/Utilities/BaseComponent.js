/**
 *
 */
import {Component} from 'react';
import {Dimensions, PixelRatio} from 'react-native';
import MyStyleSheet from './MyStyleSheet';
const {height, width} = Dimensions.get('screen');

class BaseComponent extends Component {
    screenWidth = width;
    screenHeight = height;

    screenSize = Math.round(Math.abs(Math.sqrt(Math.pow(height, 2) + Math.pow(width, 2))));

    onePixel = (PixelRatio.get() == 3 ? 2 : 1) / PixelRatio.get();

    getSize(size) {
        return parseInt(this.screenSize * (size / 1000) * (1 + this.onePixel));
    }

    constructor(props) {
        super(props);
        this.state = {};
    }

    _setDemensions() {
        const {height, width} = Dimensions.get('screen');
        this._setDimensionsToStyle(height, width);

        this.screenWidth = width;
        this.screenHeight = height;
    }

    _setDimensionsToStyle(height, width) {
        MyStyleSheet.Dimensions = {height: height, width: width, screenSize: this.screenSize}; // set to style sheet
    }

    componentDidMount() {
        this._setDemensions();
    }

    componentWillUnmount() {}
}

export default BaseComponent;
