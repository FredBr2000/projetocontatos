import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TokenService } from '../services/token.service';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {

  //atributos
  mensagem_sucesso: string = "";
  mensagem_erro: string = "";
  isLoading: boolean = false;

  constructor(
    private accountService: AccountService, //inicialização (injeção de dependência)
    private tokeService: TokenService
  ) { }

  formPassword = new FormGroup({
    //campo 'email'
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ])
  })

  get form(): any {
    return this.formPassword.controls;
  }

  ngOnInit(): void {
    this.tokeService.verifyIsAuthenticated();
  }

  onSubmit(): void {

    //limpar as mensagens
    this.mensagem_sucesso = "";
    this.mensagem_erro = "";

    //modificando a flag de carregamento para 'true'
    this.isLoading = true;

    //chamando o serviço de recuperação de senha
    this.accountService.passwordRecover(this.formPassword.value)
      .subscribe(
        (data: any) => { //resposta de sucesso da API
          this.mensagem_sucesso = data.message;
          this.formPassword.reset();
          this.isLoading = false;
        },
        (e: any) => {

          //verificando o tipo de erro retornado pela API
          switch (e.status) {
            case 422:
              this.mensagem_erro = e.error;
              break;
            default:
              this.mensagem_erro = "Não foi possível realizar a operação.";
              break;
          }

          this.isLoading = false;
        }
      )
  }
}
