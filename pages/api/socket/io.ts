import { Server as NetServer } from "http";
import { NextApiRequest } from "next";
import { NextApiResponseServerIo } from "@/types";
import { Server as ServerIO} from "socket.io";

export const config = {
    api: {
        bodyParser: false
    }
}

const ioHandler = (req:NextApiRequest, res:NextApiResponseServerIo) => {
    if(!res.socket.server.io)
    {
        const path = "/api/socket/io";
        const httpServer:NetServer = res.socket.server as any;
        const io = new ServerIO(httpServer, {
            path: path,
            addTrailingSlash: false,
        });
        res.socket.server.io = io;
    }
    res.end();
}

export default ioHandler;


// This code essentially sets up a Socket.IO server the first time the API is called.
// If the server is already set up, it skips that part. It creates a WebSocket server at the /api/socket/io path,
// allowing real-time communication between the server and clients.
// In simpler terms: it enables real-time features like live chat or notifications in your Next.js app by initializing a WebSocket server using Socket.IO.