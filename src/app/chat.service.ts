import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { map, filter, switchMap } from 'rxjs/operators';
import { WebsocketService } from "./websocket.service";
import {webSocket, WebSocketSubject} from 'rxjs/webSocket';

const CHAT_URL = "wss://4e2dbjjjpg.execute-api.eu-west-1.amazonaws.com/production";

export interface Message {
  device_id: string;
}

@Injectable()
export class ChatService {

  messages: WebSocketSubject<any> = webSocket(CHAT_URL);
  constructor(wsService: WebsocketService) {

    // this.myWebSocket.asObservable().subscribe(dataFromServer => {
    //   console.log(dataFromServer)
    //   this.messages = dataFromServer.data;
    // });
  }
}
