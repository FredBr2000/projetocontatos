import { Component, OnInit } from '@angular/core';
import { AccountService } from '../services/account.service';
import { TokenService } from '../services/token.service';
@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.css']
})
export class UserDataComponent implements OnInit {

  //atributo
  usuario: any = {
    idUsuario: '',
    nome: '',
    email: '',
    dataCadastro: ''
  };

  constructor(
    private accountService: AccountService, //inicialização (injeção de dependência)
    private tokenService:TokenService
    ) { }

  //função executada quando o componente é carregado
  ngOnInit(): void {
    this.tokenService.verifyIsNotAuthenticated();

    this.accountService.userData()
      .subscribe(
        (data: any) => {
          //capturando os dados do usuario
          this.usuario = data;
        },
        (e: any) => {
          console.log(e);
        }
      )
  }
}
