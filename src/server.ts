import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";
import { setTimeout } from "node:timers";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();


app.prepare().then(() => {
    console.log('Creating socket.io server.');
    const httpServer = createServer(handler);
    const io = new Server(httpServer);

    let num = 0;

    const count = ()=>{
        num++;
        io.emit('message', num);
        console.log('sending a message');
        setTimeout(count, 1000);
    }
    count();


    
    io.on("connection", (socket) => {
        let connected = true;
        console.log('A user connected');
        socket.emit('message', num);
        socket.on('message', message=>{

        });
        
        socket.on('disconnect', message =>{
            connected = false;
            console.log('A user disconnected');
        });
    });

    httpServer
        .once("error", (err) => {
            console.error(err);
            process.exit(1);
        })
        .listen(port, () => {
            console.log(`> Ready on http://${hostname}:${port}`);
        });
});