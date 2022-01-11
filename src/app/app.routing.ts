//importando a biblioteca para criação de modulos
import { NgModule } from "@angular/core";

//importando o módulo de mapeamento de rotas
import { Routes, RouterModule } from '@angular/router';

//importando os componente que serão mapeamentos com rotas
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { PasswordComponent } from "./password/password.component";
import { UserDataComponent } from "./user-data/user-data.component";
import { ContatosCadastroComponent } from "./contatos-cadastro/contatos-cadastro.component";
import { ContatosConsultaComponent } from "./contatos-consulta/contatos-consulta.component";
import { ContatosEdicaoComponent } from "./contatos-edicao/contatos-edicao.component";

//mapeamento das rotas dos componentes
const routes: Routes = [
    { path: '', component: LoginComponent }, //raiz do projeto
    { path: 'register', component: RegisterComponent },
    { path: 'password', component: PasswordComponent },
    { path: 'user-data', component: UserDataComponent },
    { path: 'contatos-cadastro', component: ContatosCadastroComponent },
    { path: 'contatos-consulta', component: ContatosConsultaComponent },
    { path: 'contatos-edicao/:id', component: ContatosEdicaoComponent }
]

//registrando e exportando a configuração de rotas
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

//declaração do nome da classe de configuração
export class AppRoutingModule { }
