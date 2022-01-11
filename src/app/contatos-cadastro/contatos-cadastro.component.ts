import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ContatosService } from '../services/contatos.service';
import { TokenService } from '../services/token.service';

@Component({
  selector: 'app-contatos-cadastro',
  templateUrl: './contatos-cadastro.component.html',
  styleUrls: ['./contatos-cadastro.component.css']
})
export class ContatosCadastroComponent implements OnInit {

  mensagem_sucesso: string = "";
  mensagem_erro: string = "";

  isLoading: boolean = false;

  constructor(
    //inicializando por meio de injeção de dependencia
    private contatosService: ContatosService,
    private tokenService: TokenService
  ) { }

  //criando o formulário
  formCadastro = new FormGroup({

    //campo 'nome'
    nome: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(150)
    ]),

    //campo 'email'
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),

    //campo 'telefone'
    telefone: new FormControl('', [
      Validators.required
    ]),

  })

  //função para acessar os campos do formulario
  get form(): any {
    return this.formCadastro.controls;
  }

  ngOnInit(): void {
    this.tokenService.verifyIsNotAuthenticated();
  }

  //função para processar o SUBMIT do formulário
  onSubmit() {

    this.isLoading = true;

    this.mensagem_sucesso = "";
    this.mensagem_erro = "";

    //requisição de cadastro para a API..
    this.contatosService.post(this.formCadastro.value)
      .subscribe(
        (data: any) => {

          this.mensagem_sucesso = data.message;

          this.formCadastro.reset();
          this.isLoading = false;
        },
        (e: any) => {
          this.mensagem_erro = e.error;
          this.isLoading = false;
        }
      );

  }

}
