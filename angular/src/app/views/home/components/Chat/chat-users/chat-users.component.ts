import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/auth/auth.service';
import { ChatService } from 'src/app/core/chat/chat.service';

@Component({
  selector: 'app-chat-users',
  templateUrl: './chat-users.component.html',
  styleUrls: ['./chat-users.component.scss'],
})
export class ChatUsersComponent implements OnInit {
  userId: string;
  allChatUsers: any[] = [];
  chatUsers: any[] = [];
  searchText: string;
  @Input() activeUserId: string;
  @Input() activeChatFilter: number = 0;
  @Output() onChangeUser: EventEmitter<any> = new EventEmitter();
  @Output() noUserAvailble: EventEmitter<any> = new EventEmitter();
  //activeChatFilter: number = 0;
  hostId = null;
  chatFilter = {
    all: 0,
    archived: 1,
    blocked: 2
  }
  senderDetails:any;

  constructor(private chatService: ChatService, private activatedRoute: ActivatedRoute,private authService:AuthService) {
    this.userId = localStorage.getItem('userId') || ' ';
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(res => {
      this.hostId = res['id'];
    });
    this.getAllUsers();
    this.getUserDetails();
  }

  getAllUsers() {
    this.chatService.getAllUsers(this.hostId).subscribe((res) => {
      this.allChatUsers = [...new Map(res.map((item: any) =>
        [item?.['userId'], item])).values()];
        this.allChatUsers.length > 0 ? this.noUserAvailble.emit(false):this.noUserAvailble.emit(true);
      this.filterUsers(this.activeChatFilter);
    });
  }

  isActive(userId: string) {
    return userId?.toUpperCase() == this.activeUserId?.toUpperCase();
  }
  getUserChat(user: any) {
    this.activeUserId = user.userId;
    this.onChangeUser.emit(user);
  }
  filterUsers(filter:any) {
    this.activeChatFilter = filter;
    let users = [];
    if (this.activeChatFilter == this.chatFilter.archived) {
      users = this.allChatUsers.filter(res => res.isArchivedUser == true);
      this.chatUsers = Object.assign([], users);
    }
    else if (this.activeChatFilter == this.chatFilter.blocked) {
      users = this.allChatUsers.filter(res => res.isBlocked == true);
      this.chatUsers = Object.assign([], users);
    }
    else {
      users = this.allChatUsers.filter(res => res.isBlocked == false && res.isArchivedUser == false);
      this.chatUsers = Object.assign([], users);
    }
    if (this.chatUsers.length > 0) {
      this.onChangeUser.emit(this.chatUsers[0]);
    }
  }
  getUserDetails() {
    this.authService.getUserInfo().subscribe((res: any) => {
      this.senderDetails = res
    })
  }
}
