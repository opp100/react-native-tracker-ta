/*
 * 
 * Invoked from https://github.com/iberHK/react-native-picker/blob/master/view/PickerView.js
 * 
 */
import React from 'react';

import {View, Animated, PanResponder} from 'react-native';

import {BaseComponent} from '../../Utilities';

import Svg, {LinearGradient, Rect, Stop} from 'react-native-svg';
import {connect} from 'react-redux';
import {I18n, Constraints} from '../../Utilities';

class PickerView extends BaseComponent {
    static defaultProps = {
        itemHeight: 40,
        onPickerSelected: null,
        selectedIndex: 0
    };

    _previousTop = 0;

    lastTop = 0;
    list = [];

    constructor(props) {
        super(props);
        this.list = ['', ''].concat(props.list).concat(['', '']);
        this.colorPath = [];
        let length = this.list.length;
        for (let i = 0; i < length; i++) {
            this.colorPath.push(new Animated.Value(i == this.props.selectedIndex + 2 ? 1 : 0));
        }
        this.path = new Animated.Value(-props.itemHeight * this.props.selectedIndex);
        this.state = {
            list: this.list,
            selectedIndex: props.selectedIndex
        };
        this.maxTop = 0;
        this.maxBottom = -props.itemHeight * (this.list.length - 5);
        this.onStartShouldSetPanResponder = this.onStartShouldSetPanResponder.bind(this);
        this.onMoveShouldSetPanResponder = this.onMoveShouldSetPanResponder.bind(this);
        this.onPanResponderGrant = this.onPanResponderGrant.bind(this);
        this.onPanResponderMove = this.onPanResponderMove.bind(this);
        this.onPanResponderEnd = this.onPanResponderEnd.bind(this);

        this.parentTopY = this.screenHeight - props.itemHeight * 5 - this.getSize(15);
        this.parentBottomY = this.screenHeight - this.getSize(15);
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps) {
            this.list = ['', ''].concat(nextProps.list).concat(['', '']);
            let listChange = JSON.stringify(this.list) != JSON.stringify(this.state.list);
            let indexChange = nextProps.selectedIndex != this.state.selectedIndex;
            if (listChange || indexChange) {
                console.log('shouldComponentUpdate');
                this.path.setValue(-this.props.itemHeight * nextProps.selectedIndex);
                if (listChange) {
                    this.colorPath = [];
                    let length = this.list.length;
                    for (let i = 0; i < length; i++) {
                        this.colorPath.push(new Animated.Value(i == nextProps.selectedIndex + 2 ? 1 : 0));
                    }
                }
                nextState.list = this.list;
                nextState.selectedIndex = nextProps.selectedIndex;

                this.maxTop = 0;
                this.maxBottom = -this.props.itemHeight * (this.list.length - 5);
                return true;
            }
        }
        return false;
    }

    onStartShouldSetPanResponder(evt) {
        if (evt.nativeEvent.pageY < this.parentTopY || evt.nativeEvent.pageY > this.parentBottomY) {
            return false;
        } else {
            this.path && this.path.removeAllListeners();
            this.path.stopAnimation();
            this.keyDown = Date.now();
            return true;
        }
    }

    onMoveShouldSetPanResponder(evt) {
        if (evt.nativeEvent.pageY < this.parentTopY || evt.nativeEvent.pageY > this.parentBottomY) {
            return false;
        } else {
            this.path && this.path.removeAllListeners();
            this.path.stopAnimation();
            return true;
        }
    }

    onPanResponderGrant() {
        this.lastTop = this.path._value;
    }

    onPanResponderMove(evt, gestureState) {
        if (global.timer != null) {
            global.timer.map((item) => {
                clearTimeout(item);
            });
        }
        this._previousTop = this.lastTop + gestureState.dy;
        if (this._previousTop > 0) {
            this._previousTop = Math.min(this._previousTop, this.maxTop + this.props.itemHeight);
        } else {
            this._previousTop = Math.max(this._previousTop, this.maxBottom - this.props.itemHeight);
        }
        this.path.setValue(this._previousTop);
        if (this.previousTop) {
            this.velocity = gestureState.dy - this.previousTop;
        } else {
            this.velocity = 0;
        }
        this.previousTop = gestureState.dy;
    }

    lastEvent = null;

    lastTwoEvent = null;

    onPanResponderEnd(evt, gestureState) {
        let actionTime = Date.now() - this.keyDown;
        if (actionTime < 300 && Math.abs(gestureState.vy) < 0.1) {
            let clickPosition = -(parseInt((gestureState.y0 - this.parentTopY) / this.props.itemHeight) - 2);
            let toValue = this.path._value;
            let number = Math.round(toValue / this.props.itemHeight);
            toValue = this.props.itemHeight * number;
            toValue = toValue + this.props.itemHeight * clickPosition;
            if (toValue > 0) {
                toValue = Math.min(toValue, this.maxTop);
            } else {
                toValue = Math.max(toValue, this.maxBottom);
            }
            if (isNaN(toValue)) {
                return;
            } else {
                Animated.timing(this.path, {toValue: toValue, duration: 200}).start(() => {
                    this.onSeleted(Math.abs(toValue / this.props.itemHeight - 2));
                });
            }
        } else {
            this.lastTop = this._previousTop;
            let toValue = this._previousTop + gestureState.vy * this.props.itemHeight * 2;
            let number = Math.round(toValue / this.props.itemHeight);
            toValue = this.props.itemHeight * number;
            if (toValue > 0) {
                toValue = Math.min(toValue, this.maxTop);
            } else {
                toValue = Math.max(toValue, this.maxBottom);
            }
            Animated.decay(this.path, {
                velocity: gestureState.vy,
                deceleration: 0.995
            }).start(() => {
                if (this.path._value % this.props.itemHeight == 0) {
                    this.path.removeListener(this.pathListener);
                    this.pathListener = null;
                } else {
                    if (this.pathListener) {
                        this.path.removeListener(this.pathListener);
                        this.pathListener = null;
                        let toValue = Math.round(this.path._value / this.props.itemHeight) * this.props.itemHeight;
                        Animated.timing(this.path, {
                            toValue: toValue,
                            duration: 50
                        }).start(() => {
                            this.onSeleted(Math.abs(toValue / this.props.itemHeight - 2));
                        });
                    }
                }
            });
            this.pathListener = this.path.addListener((listener) => {
                if (listener.value < this.maxBottom && this.pathListener) {
                    this.path.removeListener(this.pathListener);
                    this.pathListener = null;
                    Animated.timing(this.path, {toValue: this.maxBottom}).start(() => {
                        this.onSeleted(Math.abs(this.maxBottom / this.props.itemHeight - 2));
                    });
                } else if (listener.value > this.maxTop - this.props.itemHeight && this.pathListener) {
                    this.path.removeListener(this.pathListener);
                    this.pathListener = null;
                    Animated.timing(this.path, {toValue: this.maxTop}).start(() => {
                        this.onSeleted(Math.abs(this.maxTop / this.props.itemHeight - 2));
                    });
                }
            });
        }
    }

    onSeleted(selectedIndex) {
        if (global.timer == null) {
            global.timer = [];
        }
        global.timer.push(
            setTimeout(() => {
                this.colorPath.map((item, index) => {
                    if (item._value == 0 && selectedIndex == index) {
                        item.setValue(1);
                    } else if (item._value == 1 && selectedIndex != index) {
                        item.setValue(0);
                    }
                });
                this.props.onPickerSelected && this.props.onPickerSelected(this.state.list[selectedIndex]);
            }, 20)
        );
    }

    UNSAFE_componentWillMount() {
        this._panResponder = PanResponder.create({
            onStartShouldSetPanResponder: this.onStartShouldSetPanResponder,
            onMoveShouldSetPanResponder: this.onMoveShouldSetPanResponder,
            onPanResponderGrant: this.onPanResponderGrant,
            onPanResponderMove: this.onPanResponderMove,
            onPanResponderRelease: this.onPanResponderEnd,
            onPanResponderTerminate: this.onPanResponderEnd
        });
    }

    renderList() {
        return this.state.list.map((item, index) => {
            return this.renderItem(item, index);
        });
    }

    renderItem(item, index) {
        const {language, theme} = this.props;
        const themeColor = Constraints.Themes.get(theme);

        return (
            <View
                key={index}
                style={{
                    width: this.props.itemWidth,
                    height: this.props.itemHeight,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                <Animated.Text
                    style={{
                        color: this.colorPath[index].interpolate({
                            inputRange: [0, 1],
                            outputRange: [themeColor.textDark.toHex(), themeColor.primary.toHex()]
                        }),
                        fontSize: this.props.fontSize ? this.props.fontSize : this.getSize(15),
                        backgroundColor: 'transparent',
                        fontWeight: 'normal'
                    }}>
                    {I18n.t('list_items', item, {locale: language})}
                </Animated.Text>
            </View>
        );
    }

    render() {
        const {theme} = this.props;
        const themeColor = Constraints.Themes.get(theme);

        return (
            <View
                style={{
                    width: this.props.itemWidth,
                    height: this.props.itemHeight * 5 + this.getSize(15),
                    backgroundColor: 'transparent'
                }}>
                <View
                    ref={(ref) => (this.ref = ref)}
                    {...this._panResponder.panHandlers}
                    style={{
                        overflow: 'hidden',
                        width: this.props.itemWidth,
                        height: this.props.itemHeight * 5 + this.getSize(15),
                        backgroundColor: 'transparent'
                    }}>
                    <Animated.View
                        style={{
                            transform: [
                                {
                                    translateY: this.path
                                }
                            ]
                        }}>
                        {this.renderList()}
                    </Animated.View>
                    <View
                        style={{
                            position: 'absolute',
                            alignSelf:'center',
                            width: parseInt(this.props.itemWidth * 0.9),
                            height: this.onePixel,
                            top: (this.props.itemHeight * 4) / 2,
                            backgroundColor: themeColor.secondary.toRGBA(0.7)
                        }}
                    />
                    <View
                        style={{
                            position: 'absolute',
                            alignSelf:'center',
                            width: parseInt(this.props.itemWidth * 0.9),
                            height: this.onePixel,
                            top: (this.props.itemHeight * 6) / 2,
                            backgroundColor: themeColor.secondary.toRGBA(0.7)
                        }}
                    />
                    <Svg
                        onStartShouldSetResponder={() => {
                            return false;
                        }}
                        onResponderStart={() => {
                            return false;
                        }}
                        style={{position: 'absolute', top: 0}}
                        height={this.props.itemHeight}
                        width={this.props.itemWidth}>
                        <LinearGradient id="grad" x1="0" y1={this.props.itemHeight} x2={0} y2="0">
                            <Stop offset="0" stopColor={themeColor.background.toHex()} stopOpacity="0.2" />
                            <Stop offset="1" stopColor={themeColor.background.toHex()} stopOpacity="1" />
                        </LinearGradient>
                        <Rect
                            x="0"
                            y="0"
                            width={this.props.itemWidth}
                            height={this.props.itemHeight}
                            fill="url(#grad)"
                            clipPath="url(#clip)"
                        />
                    </Svg>

                    <Svg
                        onStartShouldSetResponder={() => {
                            return false;
                        }}
                        onResponderStart={() => {
                            return false;
                        }}
                        style={{position: 'absolute', bottom: this.getSize(15)}}
                        height={this.props.itemHeight}
                        width={this.props.itemWidth}>
                        <LinearGradient id="grad" x1="0" y1={this.props.itemHeight} x2={0} y2="0">
                            <Stop offset="0" stopColor={themeColor.background.toHex()} stopOpacity="1" />
                            <Stop offset="1" stopColor={themeColor.background.toHex()} stopOpacity="0.4" />
                        </LinearGradient>
                        <Rect
                            x="0"
                            y="0"
                            width={this.props.itemWidth}
                            height={this.props.itemHeight}
                            fill="url(#grad)"
                            clipPath="url(#clip)"
                        />
                    </Svg>
                    <View
                        style={{
                            width: this.screenWidth,
                            height: this.props.itemHeight,
                            bottom: 0,
                            backgroundColor: themeColor.background.toHex(),
                            position: 'absolute'
                        }}
                    />
                </View>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.settings.language,
        theme: state.settings.theme
    };
};

export default connect(mapStateToProps)(PickerView);
