import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class VideoGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('progress')
  handleProgress(
    @MessageBody() data: { userId: number; videoId: number; progress: number },
  ) {
    this.server.emit('progress', data);
  }

  @SubscribeMessage('resume')
  handleResume(@MessageBody() data: { userId: number; videoId: number }) {
    this.server.emit('resume', data);
  }
}
