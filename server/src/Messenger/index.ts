import * as _ from 'lodash';

const INIT_CLIENT_ID = 'init_client_id';

interface Message {
    type: 'register' | 'init_client_id';
    message: string;
    client_id?: string;
}

class Messenger {
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
