import * as _ from 'lodash';

const INIT_CLIENT_ID = 'init_client_id';
const GENERAL_MESSAGE = 'general_message';

interface Message {
    type: 'register' | 'general';
    message: string;
    client_id?: string;
    target: number;
}

class Messenger {
    static generalMessage(msg: string) {
        const response = {
            type: GENERAL_MESSAGE,
            message: msg
        };
        return JSON.stringify(response);
    }

    static responseId(id: string) {
        const response = {
            type: INIT_CLIENT_ID,
            message: `Your id ${id}`,
            client_id: id
        };
        return JSON.stringify(response);
    }

    static register(id?: string): number {
        if (id) {
            return Number(id);
        }
        return _.random(100000, 999999);
    }

    static extractMsg(msg: string): Message | null {
        try {
            return JSON.parse(msg);
        } catch (e) {
            console.log(e.message);
            return null;
        }
    }
}

export default Messenger;
