import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SignInProps } from '../model/signIn.interface';
@Injectable({
    providedIn: 'root',
  })
export class SignInService {
 
    url: string = environment.API;
    constructor(
        private http: HttpClient
        ){
    }
    singIn(auth: SignInProps){
        return this.http.get(`${this.url}/Auth/Login?login=${auth.email}&senha=${auth.password}`)
    };
}