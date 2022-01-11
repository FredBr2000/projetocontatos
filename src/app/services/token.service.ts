import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  ACCESS_TOKEN: string = "access_token";

  constructor(
    private router: Router
  ) { }

  //função para capturar o token e grava-lo em uma local storage
  setAccessToken(accessToken: string): void {
    localStorage.setItem(this.ACCESS_TOKEN, accessToken);
  }

  //função para ler e retornar o valor do token gravado
  getAccessToken(): string | null {
    return localStorage.getItem(this.ACCESS_TOKEN);
  }

  //função para remover o token gravado
  removeAccessToken(): void {
    localStorage.removeItem(this.ACCESS_TOKEN);
  }

  verifyIsAuthenticated():void {
    if(this.getAccessToken() !=null)
    {
      this.router.navigate(['/contatos-consulta'])
            .then(() => {
              window.location.reload();
            });
    }
  }
  verifyIsNotAuthenticated():void {
    if(this.getAccessToken() ==null)
    {
      this.router.navigate(['/'])
            .then(() => {
              window.location.reload();
            });
    }
  }
}
