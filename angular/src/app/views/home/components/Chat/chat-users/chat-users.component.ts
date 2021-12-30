import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { reverse } from 'dns';
import { ChatService } from 'src/app/core/chat/chat.service';

@Component({
  selector: 'app-chat-users',
  templateUrl: './chat-users.component.html',
  styleUrls: ['./chat-users.component.scss'],
})
export class ChatUsersComponent implements OnInit {
  userId: string;
  chatUsers: any[] = [];
  searchText: string;
  @Input() activeUserId: string;
  @Input() recieverUser: any;
  @Output() onChangeUser: EventEmitter<any> = new EventEmitter();

  constructor(private chatService: ChatService) {
    this.userId = localStorage.getItem('userId') || ' ';
  }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    this.chatService.getAllUsers().subscribe((res) => {
      this.chatUsers = [...new Map(res.map((item: any) =>
        [item?.['userId'], item])).values()];
      if (this.recieverUser) {
        var find = this.chatUsers.find((res: any) => res?.userId.toLowerCase() == this.recieverUser?.id.toLowerCase());
        if (!find) {
          this.chatUsers.push({ userId: this.recieverUser.id, userName: this.recieverUser.userName, name: this.recieverUser.name, email: this.recieverUser.email });
        }
      }
      else if (!this.recieverUser && this.chatUsers.length > 0) {
        this.onChangeUser.emit(this.chatUsers[0]);
      }
    });
  }
  isActive(userId: string) {
    return userId?.toUpperCase() == this.activeUserId?.toUpperCase();
  }
  getUserChat(user: any) {
    this.activeUserId = user.userId;
    this.onChangeUser.emit(user);
  }
}
