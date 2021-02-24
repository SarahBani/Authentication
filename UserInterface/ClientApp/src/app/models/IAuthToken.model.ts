export interface IAuthToken {
  id: number;
  username: string;
  token: string;
  tokenExpiration: Date;
}
