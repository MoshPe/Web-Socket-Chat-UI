import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {WebSocketService} from "../web-socket.service";
import { WebsocketChat } from "./chat.component.model";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  wsNessageForm: NgForm | undefined;

  constructor(public webSocket: WebSocketService) { }

  ngOnInit(): void {
    this.webSocket.openWebsocketConnection();
  }

  ngOnDestroy(): void {
    this.webSocket.closeWebsocketConnection();
  }

  sendmessage(wsMessageForm: NgForm) {
    const chatMsg = new WebsocketChat(wsMessageForm.value.user, wsMessageForm.value.message);
    this.webSocket.sendWebSocketMessage(chatMsg);
    wsMessageForm.controls['message'].reset();
  }

}
