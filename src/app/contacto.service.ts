import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Contacto } from './contacto';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ContactoService {

  api: string = `http://localhost:8080/api/`
  constructor(private httpCliente: HttpClient) { }

  salvar(contacto: Contacto): Observable<Contacto>{
    return this.httpCliente.post<Contacto>(this.api, contacto)
  }
}
