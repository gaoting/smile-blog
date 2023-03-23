
// import {
//   MessageBody,
//   SubscribeMessage,
//   WebSocketGateway,
//   WebSocketServer,
//   WsResponse,
// } from '@nestjs/websockets';
// import { from, Observable } from 'rxjs';
// import { map } from 'rxjs/operators';
// // import { Server } from 'socket.io';
// import {SocketTest} from './entities/socket-test.entity'
// import { Server } from 'ws';

// @WebSocketGateway(3002, {
//   transports: ["websocket"],
//   cors: {
//     origin: '*'
//   }
// })
// export class SocketTestGateway {
//   @SubscribeMessage("msg")
//   hello(@MessageBody() data: any): any {
//     return {
//       event: "hello",
//       data: data,
//       msg: "rustfisher.com",
//     };
//   }

//   @WebSocketServer()
//   server: Server;

//   @SubscribeMessage('events')
//   findAll(@MessageBody() data: SocketTest): any {
//     return {
//       // data: data,
//       // code: 200
//     }
//   }
// }

import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import * as WebSocket from 'ws';

@WebSocketGateway(3002)
export class SocketTestGateway {
  @SubscribeMessage('hello')
  hello(@MessageBody() data: string): string {
    return data;
  }

  @SubscribeMessage('hello2')
  hello2(
    @MessageBody() data: string,
    @ConnectedSocket() client: WebSocket,
  ): string {
    console.log('收到消息 client:', client);
    // client.send(JSON.stringify({ event: 'tmp', data: '这里是个临时信息' }));
    client.send(client)
    return data;
  }
}


