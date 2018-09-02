import * as express from 'express';
import * as http from 'http';
import * as WebSocket from 'ws';
import * as _ from 'lodash';
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
            console.warn(token);
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
    const _id = _.random(100000, 999999);
    lookup[_id] = ws;
    //connection is up, let's add a simple simple event
    ws.on('message', (message: string) => {
        //log the received message and send it back to the client
        ws.send(`Hello, you sent -> ${message}`);
    });

    //send immediatly a feedback to the incoming connection
    const response = {
        message: `Your id ${_id}`,
        client_id: _id
    };
    lookup[_id].send(JSON.stringify(response));
});

//start our server
server.listen(8080, () => {
    console.log(`Server started on ${JSON.stringify(server.address())} :)`);
});
