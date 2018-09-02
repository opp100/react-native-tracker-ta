import {store} from '../../index';
import SocketAction from '../../Reducers/Socket';
import CacheStore from 'react-native-cache-store';

const INIT_CLIENT_ID = 'init_client_id';

class SocketHelper {
    init(clientId = null) {
        this.ws = new WebSocket('ws://localhost:8080', '', {
            headers: {token: '111111'}
        });

        this.ws.onopen = () => {
            // connection opened
            this.register(clientId);
        };

        this.ws.onmessage = (e) => {
            // a message was received
            // console.warn(e.data);
            this.processMsg(e.data);
        };

        this.ws.onerror = (e) => {
            // an error occurred
            console.warn(e.message);
            setTimeout(() => {
                this.init();
            }, 1500);
        };

        this.ws.onclose = (e) => {
            // connection closed
            console.warn(e.code, e.reason);
        };
    }

    register(clientId) {
        if (!clientId) {
            this.send({type: 'register'});
            return;
        }
        this.send({client_id: clientId, type: 'register'});
    }

    send(msg) {
        if (typeof msg != 'string') {
            msg = JSON.stringify(msg);
        }
        this.ws.send(msg); // send a message
    }

    processMsg(msg) {
        let _obj = {};
        try {
            _obj = JSON.parse(msg);
        } catch (e) {
            // TODO: show message
            console.warn(msg);
            return msg;
        }

        if (_obj['type'] == INIT_CLIENT_ID && _obj['client_id']) {
            CacheStore.set('SOCKET_CLIENT_ID', _obj['client_id']);
            store.dispatch(SocketAction.storeClientId(_obj['client_id']));
            return _obj['client_id'];
        }
    }
}

export default SocketHelper;
