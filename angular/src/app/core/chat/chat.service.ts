import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()
export class ChatService {
  private readonly apiURl = environment.CHAT_API_URL + "/api/app/chat";
  constructor(private http: HttpClient) { }

  broadcastMessage(msgDto: any) {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('X-Skip-Loader-Interceptor', 'true');
    return this.http.post(this.apiURl + '/send-message', msgDto, { headers: headers });
  }
  getUserChat(userId: string) {
    return this.http.get<any>(this.apiURl + '/user-chats/' + userId)
  }
  getAllUsers(hostId:any) {
    return this.http.get<any>(this.apiURl + '/users/'+hostId)
  }

  changeStatus(blockedUserId: string,isBlock:boolean) {
    return this.http.post<any>(this.apiURl + '/block-user/' + blockedUserId+'?isBlock='+isBlock,null)
  }

  archiveChat(archivedUserId:string,isArchive:boolean){
    return this.http.post<any>(this.apiURl + '/archive-chats/'+archivedUserId+'?isArchive='+isArchive,null)
  }

  getUnreadCount(){
    return this.http.get<number>(this.apiURl + '/un-read-chat-counts')
  }

}
