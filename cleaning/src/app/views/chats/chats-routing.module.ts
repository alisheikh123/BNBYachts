import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './chat/chat.component';

const routes: Routes = [
    {
        path: "", component: ChatComponent
      },
      {
        path: "chat/:id", component: ChatComponent
      },
      {
        path: "chat", component: ChatComponent
      },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatsRoutingModule { }
