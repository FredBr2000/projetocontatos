import { TokenizeResult } from '@angular/compiler/src/ml_parser/lexer';
import { Component, OnInit } from '@angular/core';
import { ContatosService } from '../services/contatos.service';
import { TokenService } from '../services/token.service';

@Component({
  selector: 'app-contatos-consulta',
  templateUrl: './contatos-consulta.component.html',
  styleUrls: ['./contatos-consulta.component.css']
})
export class ContatosConsultaComponent implements OnInit {

  contatos: any[] = [];

  pagina = 1;
  filtro = "";

  constructor(
    private contatosService: ContatosService,
    private tokenService: TokenService
  ) { }

  //função executada quando o componente é carregado
  ngOnInit(): void {

    this.tokenService.verifyIsNotAuthenticated();
    
    this.contatosService.getAll()
      .subscribe(
        (data) => {
          this.contatos = data as any[];
        },
        (e: any) => {
          console.log(e);
        }
      )
  }

  //função para excluir um contato
  excluir(idContato: string): void {

    if (window.confirm('Deseja realmente excluir este contato?')) {

      this.contatosService.delete(idContato)
        .subscribe(
          (data: any) => {

            //recarregar a consulta
            this.ngOnInit();

            window.alert(data.message);           
            
          },
          (e: any) => {
            console.log(e);
          }
        )
    }
  }

  //função para fazer a paginação do componente
  handlePageChange(event: any): void {
    this.pagina = event;
  }

}
