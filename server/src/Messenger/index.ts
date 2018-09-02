import * as _ from 'lodash';
import * as WebSocket from 'ws';

const INIT_CLIENT_ID = 'init_client_id';
const GENERAL_MESSAGE = 'general_message';

interface Message {
    type: 'register' | 'general';
    message: string;
    client_id?: string;
    target: number;
}

class Messenger {
    lookup: WebSocket[];
    ws: WebSocket;
    constructor(lookup: WebSocket[], ws: WebSocket) {
        this.lookup = lookup;
        this.ws = ws;
    }
    send(message: string) {
        let msgObj = this.extractMsg(message);
        console.warn(msgObj);
        if (!msgObj) {
            return;
        }

        if (msgObj.type == 'register') {
            let _id;
            _id = this.register(msgObj.client_id);
            this.lookup[_id] = this.ws;
            this.lookup[_id].send(this.responseId(_id.toString()));
        }
        if (msgObj.type == 'general') {
            let _id = msgObj.target;
            this.lookup[_id].send(this.generalMessage(msgObj.message));
        }
    }
    generalMessage(msg: string) {
        const response = {
            type: GENERAL_MESSAGE,
            message: msg
        };
        return JSON.stringify(response);
    }

    responseId(id: string) {
        const response = {
            type: INIT_CLIENT_ID,
            message: `Your id ${id}`,
            client_id: id
        };
        return JSON.stringify(response);
    }

    register(id?: string): number {
        if (id) {
            return Number(id);
        }
        return _.random(100000, 999999);
    }

    extractMsg(msg: string): Message | null {
        try {
            return JSON.parse(msg);
        } catch (e) {
            console.log(e.message);
            return null;
        }
    }
}

export default Messenger;
