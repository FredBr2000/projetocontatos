import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { TokenService } from "../services/token.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(
        private tokenService: TokenService //inicialização (injeção de dependencia)
    ) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        //mapeando os endpoints que não precisam de token
        if (!request.url.includes('/api/Account/Register')
            || !request.url.includes('/api/Account/PasswordRecover')
            || !request.url.includes('​/api​/Account​/Login')) {

            //enviando o token no cabeçalho da requisição
            request = request.clone({
                setHeaders: { Authorization: 'Bearer ' + this.tokenService.getAccessToken() }
            })

        }

        return next.handle(request);
    }
}