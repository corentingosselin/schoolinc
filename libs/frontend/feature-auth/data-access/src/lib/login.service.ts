import { Injectable } from '@angular/core';
import { UserSessionResponse } from '@schoolinc/shared/api-interfaces';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { map } from 'rxjs';

const LOGIN_USER_AUTH = gql`
  mutation LoginUser($loginUserDto: LoginUserDto!) {
    loginUser(loginUserDto: $loginUserDto) {
      token
      user {
        id
      }
    }
  }
`;

interface LoginResponse {
  loginUser: UserSessionResponse;
}

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private apollo: Apollo) {}



  login(email: string, password: string) {
    return this.apollo.mutate<LoginResponse>({
      mutation: LOGIN_USER_AUTH,
      variables: {
        loginUserDto: {
          email,
          password,
        },
      },
    }).pipe(map(response => response.data?.loginUser));
  }
}
