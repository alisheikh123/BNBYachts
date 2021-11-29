export class UserModel {
  firstName?: string;
  lastName?: string;
  email?: string;
  id?: number;
  userName?: string;
  guid?: any;
  plainPassword?: string;
  fullname?: string;
  emailAddress?: string;
  pic?: string;
  roles?: number[];
  occupation?: string;
  companyName?: string;
  phone?: string;

  setUser(user: any) {
    this.firstName = user.username || '';
    this.lastName = user.username || '';
    this.userName = user.username || '';
    this.plainPassword = user.password || '';
    this.fullname = user.fullname || '';
    this.emailAddress = user.email || '';
    this.roles = user.roles || [];
    this.occupation = user.occupation || '';
    this.companyName = user.companyName || '';
    this.phone = user.phone || '';
  }
}
