import { OnModuleInit } from "@nestjs/common";
import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from "socket.io";

@WebSocketGateway(8080)
export class MyGateway implements OnModuleInit{
    @WebSocketServer()
    server: Server;
    onModuleInit() {
        this.server.on('connection', (socket) => {
            console.log(`${socket.id} connected `);
            socket.on('disconnect', ()=> {
                console.log(`${socket.id} disconnected `);
            })
        })
    }
    
    @SubscribeMessage('newMessage')
    onNewMessage(@MessageBody() body: any) {
        console.log(body);
        this.server.emit('onMessage', {
            message: 'new message',
            content: body
        })
    }
}