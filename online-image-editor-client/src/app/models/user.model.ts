export class User {
  // TODO: Remove username, only need email to sign in
  username: string = '';
  email?: string;
  displayedName: string = this.username;
}
