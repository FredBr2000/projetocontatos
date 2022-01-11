import { invalid } from '@angular/compiler/src/render3/view/util';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from './services/token.service';
import { AccountService } from './services/account.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  isAuthenticated: boolean = false;

  usuario: any = {
    nome: '',
    email: ''
  }

  constructor(
    private tokenService: TokenService,
    private accountService: AccountService,
    private router: Router
  ) { }

  ngOnInit(): void {
    var token = this.tokenService.getAccessToken();
    this.isAuthenticated = token != null && token != undefined;

    if (this.isAuthenticated) {

      this.accountService.userData()
        .subscribe(
          (data: any) => {
            this.usuario.nome = data.nome;
            this.usuario.email = data.email;
          },
          (e: any) => {

          }
        )
    }
  }

logout()  :void{

  if (window.confirm('Deseja realmente sair da sessao?')){
    this.tokenService.removeAccessToken();
    this.router.navigate(['/'])
    .then(()=>{
      window.location.reload();
    })
  }
}

}
