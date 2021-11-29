export class UserModel {
  FirstName?: string;
  LastName?: string;
  Email?: string;
  id?: number;
  UserName?: string;
  guid?: any;
  PlainPassword?: string;
  fullname?: string;
  EmailAddress?: string;
  pic?: string;
  roles?: number[];
  occupation?: string;
  companyName?: string;
  phone?: string;

  setUser(user: any) {
    this.FirstName = user.username || '';
    this.LastName = user.username || '';
    this.UserName = user.username || '';
    this.PlainPassword = user.password || '';
    this.fullname = user.fullname || '';
    this.EmailAddress = user.email || '';
    this.roles = user.roles || [];
    this.occupation = user.occupation || '';
    this.companyName = user.companyName || '';
    this.phone = user.phone || '';
  }
}
