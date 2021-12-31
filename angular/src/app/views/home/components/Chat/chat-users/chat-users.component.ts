import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  @Output() onChangeUser: EventEmitter<any> = new EventEmitter();
  isArchivedChats: boolean = true;
  hostId = null;

  constructor(private chatService: ChatService, private activatedRoute: ActivatedRoute) {
    this.userId = localStorage.getItem('userId') || ' ';
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(res => {
      this.hostId = res['id'];
    });
    this.getAllUsers();
  }

  getAllUsers() {
    this.chatService.getAllUsers(this.hostId).subscribe((res) => {
      this.allChatUsers = [...new Map(res.map((item: any) =>
        [item?.['userId'], item])).values()];
      this.filterUsers();
    });
  }

  isActive(userId: string) {
    return userId?.toUpperCase() == this.activeUserId?.toUpperCase();
  }
  getUserChat(user: any) {
    this.activeUserId = user.userId;
    this.onChangeUser.emit(user);
  }
  filterUsers() {
    this.isArchivedChats = !this.isArchivedChats;
    let users = this.allChatUsers.filter(res => res.isArchivedUser == this.isArchivedChats);
    this.chatUsers = Object.assign([], users);
    if (this.chatUsers.length > 0) {
      this.onChangeUser.emit(this.chatUsers[0]);
    }
  }
}
