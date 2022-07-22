import { WebsocketChat } from "./chat/chat.component.model";
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  websocket = new WebSocket('ws://localhost:7071/ws')
  websocketMessage: WebsocketChat[] = [];

  constructor() {
  }

  openWebsocketConnection() {
    //this.websocket = new WebSocket('ws://localhost:7071')
    console.log(this.websocket)
    console.log('location.host', location.host)
    

    this.websocket.onopen = (e: any) => {
      console.log('Connection has been established');
      this.websocket.send(JSON.stringify({'message': 'Welcome to the chat. Type below to begin a conversation...' }));
      console.log(e);
    }

    this.websocket.onmessage = (e: any) => {
      console.log('this.websocket.onmessage - ',e);
      const chatMsg = JSON.parse(e.data);
      this.websocketMessage.push(chatMsg);
    }

    this.websocket.onclose = (e: any) => {
      console.log(e);
    }
  }
 
  sendWebSocketMessage(charMsg: WebsocketChat) {
    console.log('sendWebSocketMessage - ', charMsg)
    this.websocket.send(JSON.stringify((charMsg)))
  }

  closeWebsocketConnection() {
    this.websocket.close();
  }
}
