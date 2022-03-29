import { ThisReceiver } from '@angular/compiler';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { forkJoin } from 'rxjs';
import { find } from 'rxjs/operators';
import { AppComponent } from 'src/app/app.component';
import { AuthService } from 'src/app/core/auth/auth.service';
import { ChatService } from 'src/app/core/chat/chat.service';
import { UserDefaults } from 'src/app/shared/enums/user-roles';
import { environment } from 'src/environments/environment';
import { ChatUsersComponent } from '../chat-users/chat-users.component';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  private _hubConnection!: HubConnection;
  private readonly socketUrl = environment.CHAT_API_URL + '/signalr-hubs/chat';

  userInfo: any;
  userMessages: any = [];
  isChatLoaded: boolean = false;
  recieverInfo:any;
  chat = {
    user: '',
    message: '',
    senderId: '',
    receiverId: '',
    sentDate:moment(new Date()).format("DD-MMM-YYYY"),
    sentTime:new Date(),
    isSender: false,
    blockedUser: false,
    isBlockedByMe: false
  };
  noChatsAvailble = false;
  activeChatFilter:number = 0;
  @ViewChild('chatScrollContainer') private chatScrollContainer: ElementRef;
  @ViewChild('noChatModal', { static: true }) noChatModalTemplate: any;
  assetUrlS3 = environment.S3BUCKET_URL + '/profilePicture/';
  USER_DEFAULTS = UserDefaults;

  @ViewChild(ChatUsersComponent) chatUsersComponent: ChatUsersComponent;

  constructor(
    private chatService: ChatService,
    private router:Router,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    public app:AppComponent,
    public modal:NgbModal
  ) {
    this.chat.receiverId = this.activatedRoute.snapshot.params['id'];
    this.chat.senderId = localStorage.getItem('userId')?.toString() || "";
  }
  ngOnInit(): void {
    if (this.chat.receiverId) {
      this.getAllChats().subscribe(res => {
        this.isChatLoaded = true;
        this.userMessages = res[0]?.chats;
        this.userMessages.forEach((element:any) => {
          element.sentDate = moment(element.sentDate,"YYYY-MM-DD").format("DD-MMM-YYYY");
        });
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
    this.chat.receiverId = user.userId;
    this.chatService
      .getUserChat(user.userId)
      .subscribe((res: any) => {
        this.userMessages = res?.chats;
        this.userMessages.forEach((element:any) => {
          element.sentDate = moment(element.sentDate,"YYYY-MM-DD").format("DD-MMM-YYYY");
        });
        this.chat.blockedUser = res?.isBlockedUser;
        this.chat.isBlockedByMe = res?.isBlockedByMe;
        this.app.unReadChatCount = this.app.unReadChatCount - user.unReadChatsCount;
        user.unReadChatsCount = 0;
        setTimeout(() => { this.scrollToBottom(); }, 1);
      });
  }

  send() {
    if (this.chat.message != '') {
      this._hubConnection.invoke('SendMessage', this.chat).then(res => {
        let chatResponse = JSON.parse(JSON.stringify(this.chat))
        this.chat.message = '';
        this.userMessages.push(chatResponse);
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
      res.sentDate = moment().format("DD-MMM-YYYY");
      res.sentTime = moment();
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
      let index = this.chatUsersComponent.allChatUsers.findIndex(res=>res.userId == this.chat.receiverId);
      this.chatUsersComponent.allChatUsers[index].isBlocked =  this.chat.blockedUser;
      this.activeChatFilter = 2;
      this.chatUsersComponent.filterUsers(this.activeChatFilter);
      this.toastr.success("User blocked successfully", "Blocked");
    })
  }
  archiveChat(recieverInfo:any) {
    this.chatService.archiveChat(this.chat.receiverId,!recieverInfo?.isArchivedUser).subscribe(res => {
      recieverInfo.isArchivedUser = !recieverInfo.isArchivedUser;
      let index = this.chatUsersComponent.allChatUsers.findIndex(res=>res.userId == this.chat.receiverId);
      this.chatUsersComponent.allChatUsers[index].isArchivedUser =  recieverInfo?.isArchivedUser;
      this.activeChatFilter = 1;
      this.chatUsersComponent.filterUsers(this.activeChatFilter);
      // this.userMessages= this.userMessages.filter((res:any)=>res.receiverId != this.chat.receiverId && res.senderId != this.chat.senderId);
      this.toastr.success("Chat Archived successfully", "Archived");
    })
  }

  noUserAvailable(available:boolean) {
    if(available!){
      this.noChatsAvailble = true;
      this.modal.open(this.noChatModalTemplate, { centered: true });
    }
      this.noChatsAvailble = false;
  }

}

