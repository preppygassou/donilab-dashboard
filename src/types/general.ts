import { AxiosError, AxiosResponse } from "axios";

export interface IEmail {
  email: string;
}

export interface IPassword {
  password: string;
}

export interface ICreateAccountData extends IEmail, IPassword {
  name: string;
  phone: string;
  confirmPassword: string;
  organizations?: number[];
  organization?: string;
  active?: boolean;
  invitationcode?: string;
  isNewOrganization?: boolean;
  politics?: string;
  bottom?: boolean;
}

export interface CatchErrorResponseData {
  error?: string;
}

// Extends AxiosResponse to specify the structure of `data`.
export interface CatchErrorResponse extends AxiosResponse<CatchErrorResponseData, any> {
  data: CatchErrorResponseData; // Override `data` to match your error structure.
}

// Extends AxiosError to include the custom `response` type.
export interface CatchError extends AxiosError<unknown, any> {
  response?: CatchErrorResponse;
}



