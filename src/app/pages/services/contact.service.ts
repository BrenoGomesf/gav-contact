import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CookieService } from 'src/app/core/services/cookie.service';
import { contactProps } from '../model/contact.model';
@Injectable({
    providedIn: 'root',
  })
export class ContactService {
 
    url: string = `${environment.API}/Contatos`;
    constructor(
        private http: HttpClient,
        private cookie: CookieService
        ){
    }
    get(){
        return this.http.get(`${this.url}/GetContatos`)
    };
    delete(id: number){
        return this.http.delete(`${this.url}/DeleteContato?idContato=${id}`)
    }
    create(body: contactProps){
        return this.http.post(`${this.url}/CreateContato`, body)
    }
}