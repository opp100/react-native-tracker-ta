import * as express from 'express';
import * as http from 'http';
import * as WebSocket from 'ws';
import Messenger from './Messenger';
const app = express();
app.get('/', (req, res) => {
    res.send('Hello world!\n');
});

//initialize a simple http server
const server = http.createServer(app);

//initialize the WebSocket server instance
const wss = new WebSocket.Server({
    server,
    verifyClient: (info, cb) => {
        const token = info.req.headers.token;
        if (!token) cb(false, 401, 'Unauthorized');
        else {
            //TODO: jwt token verify
            cb(true);
            // jwt.verify(token, 'secret-key', function(err, decoded) {
            //     if (err) {
            //         cb(false, 401, 'Unauthorized');
            //     } else {
            //         info.req.user = decoded; //[1]
            //         cb(true);
            //     }
            // });
        }
    }
});

let lookup: WebSocket[] = [];
wss.on('connection', (ws: WebSocket) => {
    ws.on('message', (message: string) => {
        const messenger = new Messenger(lookup, ws);
        messenger.send(message);
    });
});

//start our server
server.listen(8080, () => {
    console.log(`Server started on ${JSON.stringify(server.address())} :)`);
});
