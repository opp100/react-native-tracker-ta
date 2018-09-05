import * as _ from 'lodash';
import * as WebSocket from 'ws';

const INIT_CLIENT_ID = 'init_client_id';
const GENERAL_MESSAGE = 'general_message';
const GEOLOCATION_MESSAGE = 'geolocation_message';

declare class Coords {
    speed: number;
    heading: number;
    longitude: number;
    bearing: number;
    time: number;
    latitude: number;
    altitude: number;
    accuracy: number;
    altitudeAccuracy: number;
}

interface Message {
    type: 'register' | 'general' | 'geolocation';
    message: string;
    client_id: string;
    target: number;
    coords: Coords;
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
        let _id;
        switch (msgObj.type) {
            case 'register':
                _id = this.register(msgObj.client_id);
                this.lookup[_id] = this.ws;
                this.sendToTarget(_id, this.responseId(_id.toString()));
                break;
            case 'geolocation':
                _id = msgObj.target;
                this.sendToTarget(_id, this.geolocationMessage(msgObj.coords));
                break;
            case 'general':
            default:
                _id = msgObj.target;
                this.sendToTarget(_id, this.generalMessage(msgObj.message));
        }
    }

    sendToTarget(id: number, message: object | string) {
        if (!this.lookup[id]) return;
        if (typeof message == 'object') {
            message = JSON.stringify(message);
        }
        return this.lookup[id].send(message);
    }

    generalMessage(msg: string) {
        const response = {
            type: GENERAL_MESSAGE,
            message: msg
        };
        return response;
    }

    responseId(id: string) {
        const response = {
            type: INIT_CLIENT_ID,
            message: `Your id ${id}`,
            client_id: id
        };
        return response;
    }

    geolocationMessage(coords: Coords) {
        const response = {
            type: GEOLOCATION_MESSAGE,
            coords: coords
        };
        return response;
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
