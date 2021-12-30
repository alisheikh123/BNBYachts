import { ThisReceiver } from '@angular/compiler';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { forkJoin } from 'rxjs';
import { AppComponent } from 'src/app/app.component';
import { AuthService } from 'src/app/core/auth/auth.service';
import { ChatService } from 'src/app/core/chat/chat.service';
import { environment } from 'src/environments/environment';
import { ChatUsersComponent } from '../chat-users/chat-users.component';
import { IMessage } from './interfaces/IMessage';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  private _hubConnection!: HubConnection;
  private readonly socketUrl = environment.CHAT_API_URL + '/chatsocket';
  userInfo: any;
  userMessages: any;
  isChatLoaded: boolean = false;
  recieverInfo:any;
  chat = {
    user: '',
    message: '',
    senderId: '',
    receiverId: '',
    isSender: false,
    blockedUser: false,
    isBlockedByMe: false
  };
  @ViewChild('chatScrollContainer') private chatScrollContainer: ElementRef;

  @ViewChild(ChatUsersComponent) chatUsersComponent: ChatUsersComponent;

  constructor(
    private chatService: ChatService,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    public app:AppComponent
  ) {
    this.chat.receiverId = this.activatedRoute.snapshot.params['id'];
    this.chat.senderId = localStorage.getItem('userId')?.toString() || "";
  }
  ngOnInit(): void {
    if (this.chat.receiverId) {
      this.getAllChats().subscribe(res => {
        this.isChatLoaded = true;
        this.userMessages = res[0]?.chats;
        setTimeout(() => { this.scrollToBottom(); }, 1);
      })
    }
    this.createConnection();
    this.startConnection();
    //this.chat.receiverId = this.chatUsersComponent.chatUsers?.length > 0 ? this.chatUsersComponent.chatUsers;
  }

  getAllChats() {
    let response1 = this.chatService.getUserChat(this.chat.receiverId);
    return forkJoin([response1]);
  }

  getChat(user: any) {
    this.recieverInfo = user;
    debugger;
    this.chat.receiverId = user.userId;
    this.chatService
      .getUserChat(user.userId)
      .subscribe((res: any) => {
        this.userMessages = res?.chats;
        this.chat.blockedUser = res?.isBlockedUser;
        this.chat.isBlockedByMe = res?.isBlockedByMe;
        this.app.unReadChatCount = this.app.unReadChatCount - user.unReadChatsCount;
        user.unReadChatsCount = 0;
        setTimeout(() => { this.scrollToBottom(); }, 1);
      });
  }

  send() {
    if (this.chat) {
      this.chatService
        .broadcastMessage(this.chat)
        .subscribe((data: any) => {
          this.chat.message = '';
          this.userMessages.push(data);
          setTimeout(() => { this.scrollToBottom(); }, 1);
        });
    }
  }
  ////Signal R methods for creating connection...
  createConnection() {
    this._hubConnection = new HubConnectionBuilder()
      .withUrl(this.socketUrl + '?&userId=' + this.chat.senderId)
      .build();
  }
  //To start connection betweent machines...
  private startConnection() {
    this._hubConnection
      .start()
      .then(() => {
        this._hubConnection.invoke('GetConnectionId').then((connectionId) => {

        });
      });
    /////Calls when message is broadcast to the reciever...
    this._hubConnection.on('sendToUser', (res) => {
      this.userMessages.push(res);
      this.app.unReadChatCount = this.app.unReadChatCount +1;
      setTimeout(() => { this.scrollToBottom(); }, 1);
    });
  }
  scrollToBottom(): void {
    try {
      this.chatScrollContainer.nativeElement.scrollTop = this.chatScrollContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }
  isReciever(recieverId: string, senderId: string) {
    return recieverId.toLowerCase() == senderId.toLowerCase();
  }
  changeStatus() {
    this.chatService.changeStatus(this.chat.receiverId, !this.chat.blockedUser).subscribe(res => {
      this.chat.blockedUser = !this.chat.blockedUser;
      this.chat.isBlockedByMe = this.chat.blockedUser;
      this.toastr.success("User blocked successfully", "Blocked");
    })
  }
  archiveChat(isArchive:boolean) {
    this.chatService.archiveChat(this.chat.receiverId,isArchive).subscribe(res => {
      this.userMessages= this.userMessages.filter((res:any)=>res.receiverId != this.chat.receiverId && res.senderId != this.chat.senderId);
      this.toastr.success("Chat Archived successfully", "Archived");
    })
  }
}

