import { Server as NetServer, Socket } from "net";
import { NextApiResponse } from "next";
import { Server as SocketIOServer } from "socket.io";
import { Server, Member, Profile } from "@prisma/client";

export type ServerWithMembersWithProfiles = Server & {
    members: (Member & { profile: Profile })[];
}


// This type extends a normal Next.js API response (NextApiResponse) to include the ability to access a Socket.IO 
// server through its socket and server properties. This is useful when you want to handle real-time events in your 
// API routes.

export type NextApiResponseServerIo = NextApiResponse & {
    socket: Socket & {
        server: NetServer & {
            io: SocketIOServer;
        }
    }
}
