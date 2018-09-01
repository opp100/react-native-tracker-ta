import {Dimensions, Platform} from 'react-native';

class DeviceHelper {
    static isIPhoneX() {
        let d = Dimensions.get('window');
        const {height, width} = d;

        return (
            // This has to be iOS duh
            Platform.OS === 'ios' &&
            !Platform.isPad &&
            !Platform.isTVOS &&
            // Accounting for the height in either orientation
            (height === 812 || width === 812)
        );
    }
}

export default DeviceHelper;
