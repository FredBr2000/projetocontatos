import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(
    private httpClient: HttpClient //inicializando o objeto
  ) { }

  //método para executar o serviço de login de usuário
  login(data: any) {
    return this.httpClient.post(environment.apiContatos + "/Account/Login", data);
  }

  //método para executar o serviço de cadastro de usuário
  register(data: any) {
    return this.httpClient.post(environment.apiContatos + "/Account/Register", data);
  }

  //método para executar o serviço de recuperação de senha de usuário
  passwordRecover(data: any) {
    return this.httpClient.post(environment.apiContatos + "/Account/PasswordRecover", data);
  }

  //método para executar o serviço de consulta de usuário
  userData() {
    return this.httpClient.get(environment.apiContatos + "/Account/UserData");
  }

}
