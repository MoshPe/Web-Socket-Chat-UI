import { WebsocketChat } from "./chat/chat.component.model";
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  websocket: any = null;
  websocketMessage: WebsocketChat[] = [];

  constructor() {
  }

  openWebsocketConnection() {
    this.websocket = new WebSocket('ws://localhost:12345/')

    this.websocket.onopen = (e: any) => {
      console.log(e);
    }

    this.websocket.onmessage = (e: any) => {
      console.log(e);
      const chatMsg = JSON.parse(e.data);
      this.websocketMessage.push(chatMsg);
    }

    this.websocket.onclose = (e: any) => {
      console.log(e);
    }
  }

  sendWebSocketMessage(charMsg: WebsocketChat) {
    setInterval(() => {
      if (this.websocket.readyState === 1) {
        this.websocket.send(JSON.stringify((charMsg)))
      }
    }, 1000)
  }

  closeWebsocketConnection() {
    this.websocket.close();
  }
}
