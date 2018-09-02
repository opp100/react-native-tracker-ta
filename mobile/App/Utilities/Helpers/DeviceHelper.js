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

    static initSocket() {
        let ws = new WebSocket('ws://localhost:8080', '', {
            headers: {token: '111111'}
        });

        ws.onopen = () => {
            // connection opened
            ws.send('something'); // send a message
        };

        ws.onmessage = (e) => {
            // a message was received
            console.warn(e.data);
        };

        ws.onerror = (e) => {
            // an error occurred
            console.warn(e.message);
        };

        ws.onclose = (e) => {
            // connection closed
            console.warn(e.code, e.reason);
        };
    }
}

export default DeviceHelper;
