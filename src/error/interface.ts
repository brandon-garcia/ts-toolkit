export interface IError {
  readonly name: string;
  readonly message: string;
  readonly cause?: IError;
}

