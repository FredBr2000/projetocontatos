import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TokenService } from '../services/token.service';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  mensagem_sucesso: string = "";
  mensagem_erro: string = "";

  isLoading: boolean = false;

  //método construtor (utilizado para injeção de dependência)
  constructor(
    private accountService: AccountService,
    private tokenService:TokenService

  ) { }

  //criando o formulário
  formRegister = new FormGroup({

    //campo 'nome'
    nome: new FormControl('', [
      Validators.required, //obrigatório
      Validators.minLength(10), //minimo de caracteres
      Validators.maxLength(150) //máximo de caracteres
    ]),

    //campo 'email'
    email: new FormControl('', [
      Validators.required, //obrigatório
      Validators.email //formato de email válido
    ]),

    //campo 'senha'
    senha: new FormControl('', [
      Validators.required, //obrigatório
    ]),

    //campo 'senhaConfirmacao'
    senhaConfirmacao: new FormControl('', [
      Validators.required, //obrigatório
    ]),

  });

  //função para retornar os campos do formulário (FormControl)
  //para a página HTML acessar por exemplo as mensagens de validação
  get form(): any {
    return this.formRegister.controls;
  }

  //evento executado assim que o componente é carregado
  ngOnInit(): void {
    this.tokenService.verifyIsAuthenticated();
  }

  //função para capturar o evento SUBMIT do formulário
  onSubmit(): void {

    //limpar as mensagens
    this.mensagem_sucesso = "";
    this.mensagem_erro = "";

    //modificando o flag de carregamento para -> true
    this.isLoading = true;

    //fazendo uma requisição para a API (cadastro de usuário)
    this.accountService.register(this.formRegister.value)
      .subscribe( //capturando o promisse da API
        (data: any) => { //recebendo o retorno de sucesso da API

          //armazenando a mensagem de sucesso obtida da API
          this.mensagem_sucesso = data.message;

          //limpar os campos do formulário
          this.formRegister.reset();

          //modificando o flag de carregamento para -> false
          this.isLoading = false;
        },
        (e: any) => { //recebendo o retorno de erro da API

          switch (e.status) {

            //erro de validação
            case 400:
              if (e.error.errors.Senha)
                this.mensagem_erro = e.error.errors.Senha[0];
              else if (e.error.errors.SenhaConfirmacao)
                this.mensagem_erro = e.error.errors.SenhaConfirmacao[0];
              break;

            //erro de email já cadastrado
            case 422:
              this.mensagem_erro = e.error;
              break;

          }

          //modificando o flag de carregamento para -> false
          this.isLoading = false;
        }
      )

  }

}
