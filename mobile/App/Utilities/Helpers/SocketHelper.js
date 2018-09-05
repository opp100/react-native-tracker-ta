import {store} from '../../index';
import SocketActions from '../../Reducers/Socket';
import PopupActions from '../../Reducers/Popups';
import CacheStore from 'react-native-cache-store';

const INIT_CLIENT_ID = 'init_client_id';
const GENERAL_MESSAGE = 'general_message';
const GEOLOCATION_MESSAGE = 'geolocation_message';

let ws, reconnectInterval;
class SocketHelper {
    static init(clientId = null) {
        ws = new WebSocket('ws://192.168.0.114:8080', '', {
            headers: {token: '111111'}
        });

        ws.onopen = () => {
            if (reconnectInterval) clearInterval(reconnectInterval);
            // send header
            store.dispatch(PopupActions.showHeaderMessage('Connect Success!', 1000, 'success'));
            // connection opened
            SocketHelper.register(clientId);
        };

        ws.onmessage = (e) => {
            // a message was received
            // console.warn(e.data);
            SocketHelper.processMsg(e.data);
        };

        ws.onerror = (e) => {
            // an error occurred
            setTimeout(() => {
                SocketHelper.init();
            }, 1500);
        };

        ws.onclose = (e) => {
            // connection closed
            SocketHelper.reconnect();
        };
    }

    static register(clientId) {
        if (!clientId) {
            SocketHelper.send({type: 'register'});
            return;
        }
        SocketHelper.send({client_id: clientId, type: 'register'});
    }

    static reconnect() {
        reconnectInterval = setInterval(() => {
            ws.removeEventListener();
            SocketHelper.init();
        }, 5000);
    }

    static send(msg) {
        if (typeof msg != 'string') {
            msg = JSON.stringify(msg);
        }
        ws.send(msg); // send a message
    }

    static processMsg(msg) {
        let _obj = {};
        console.warn(msg);
        try {
            _obj = JSON.parse(msg);
        } catch (e) {
            console.warn(msg);
            return;
        }

        if (_obj['type'] == INIT_CLIENT_ID && _obj['client_id']) {
            CacheStore.set('SOCKET_CLIENT_ID', _obj['client_id']);
            store.dispatch(SocketActions.storeClientId(_obj['client_id']));
            return;
        }

        if (_obj['type'] == GENERAL_MESSAGE && _obj['message']) {
            alert(_obj['message']);
            return;
        }

        if (_obj['type'] == GEOLOCATION_MESSAGE && _obj['coords']) {
            store.dispatch(SocketActions.showMessage(_obj));
        }
    }
}

export default SocketHelper;
