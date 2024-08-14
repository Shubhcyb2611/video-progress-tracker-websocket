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
    @MessageBody() data: { userId: string; videoId: string; progress: number },
  ) {
    this.server.emit('progress', data);
  }

  @SubscribeMessage("resume")
  handleResume(@MessageBody() data :{userId : string ; videoId : string}){
    this.server.emit ("resume" , data )
  }
}
