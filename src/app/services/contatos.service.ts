import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContatosService {

  constructor(
    //inicializando atraves de injeção de dependencia
    private httpClient: HttpClient
  ) { }

  post(data: any) {
    return this.httpClient.post(environment.apiContatos + "/Contatos", data);
  }

  put(data: any) {
    return this.httpClient.put(environment.apiContatos + "/Contatos", data);
  }

  delete(id: string) {
    return this.httpClient.delete(environment.apiContatos + "/Contatos/" + id)
  }

  getAll() {
    return this.httpClient.get(environment.apiContatos + "/Contatos");
  }

  getById(id: string) {
    return this.httpClient.get(environment.apiContatos + "/Contatos/" + id);
  }
}
