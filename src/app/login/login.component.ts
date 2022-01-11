import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, RouteReuseStrategy } from '@angular/router';
import { AccountService } from '../services/account.service';
import { TokenService } from '../services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  //atributos
  mensagem_sucesso: string = "";
  mensagem_erro: string = "";
  isLoading: boolean = false;

  constructor(
    private router: Router,
    private accountService: AccountService, //inicialização (injeção de dependência)
    private tokenService: TokenService //inicialização (injeção de dependência)
  ) { }

  formLogin = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    senha: new FormControl('', [
      Validators.required
    ])
  });

  get form(): any {
    return this.formLogin.controls
  }

  ngOnInit(): void {
    this.tokenService.verifyIsAuthenticated();
  }

  onSubmit(): void {

    this.mensagem_sucesso = "";
    this.mensagem_erro = "";

    this.isLoading = true;

    this.accountService.login(this.formLogin.value)
      .subscribe(
        (data: any) => {

          this.formLogin.reset();
          this.isLoading = false;

          //gravar o token em localstorage
          this.tokenService.setAccessToken(data.accessToken);
          this.router.navigate(['/contatos-consulta'])
            .then(() => {
              window.location.reload();
            });

        },
        (e: any) => {

          switch (e.status) {
            case 401: //não autorizado
              this.mensagem_erro = e.error;
              break;
            default:
              this.mensagem_erro = "Não foi possível realizar a operação.";
              break;
          }

          this.isLoading = false;
        }
      );
  }
}
