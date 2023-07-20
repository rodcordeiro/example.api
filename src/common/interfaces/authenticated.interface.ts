/* eslint-disable @typescript-eslint/no-namespace */

export interface IAuthenticatedUser {
  user: {
    id: string;
    email: string;
  };
}

export namespace Authenticate {
  export interface IAuthToken {
    id: string;
    email: string;
  }
  export interface IAuthenticatedUser {
    user: IAuthToken;
  }
}
