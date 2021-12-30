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
  getAllUsers() {
    return this.http.get<any>(this.apiURl + '/users')
  }

  blockUser(blockedUserId: string) {
    return this.http.get<any>(this.apiURl + '/block-user/' + blockedUserId)
  }

}
