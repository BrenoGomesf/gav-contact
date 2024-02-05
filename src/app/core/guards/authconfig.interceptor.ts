import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse, HttpEvent, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { catchError, finalize, Observable, throwError } from "rxjs";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { CookieService } from "../services/cookie.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private cookie: CookieService, private toastr: ToastrService, private router: Router) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let url = req.url;

        if (!url.includes('https://') && !url.includes('http://')) {
            url = environment.API + url;
        }

        const authToken = this.cookie.getCookie('session');

        // Configuração do cabeçalho padrão
        let headers = new HttpHeaders({
            'Authorization': authToken ? `Bearer ${authToken}` : ''
        });

        // Se for uma requisição POST ou PUT, configure o Content-Type como application/json
        if (req.method === 'POST' || req.method === 'PUT') {
            headers = headers.set('Content-Type', 'application/json');
        }

        const authReq = req.clone({
            headers: headers,
            url: url,
        });

        return next.handle(authReq).pipe(
            catchError((error: HttpErrorResponse) => {
                // Handle error (e.g., show a toastr message)
                this.toastr.error('Error occurred. Please try again.');
                return throwError(error);
            }),
            finalize(() => {
                // Additional logic to run after the request
            })
        );
    }
}