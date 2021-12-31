export class IMessage {
    user: string = '';
    message: string = '';
    senderId: string = '';
    groupName: string = 'privateGroup';
    isGroupChat: boolean = false;
    isSender: boolean = false;
  }