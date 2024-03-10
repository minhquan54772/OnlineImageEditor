export class BaseResponse<T> {
  public data!: T;
  public success!: boolean;
  public message!: string;
}
