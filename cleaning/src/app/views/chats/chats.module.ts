import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatsRoutingModule } from './chats-routing.module';
import { ChatComponent } from './chat/chat.component';
import { ChatUsersComponent } from './chat-users/chat-users.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedPipesModule } from 'src/app/shared/pipes/shared-pipes.module';



@NgModule({
  declarations: [ChatComponent, ChatUsersComponent],
  imports: [
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    SharedPipesModule,
    ChatsRoutingModule
  ]
})
export class ChatsModule { }
