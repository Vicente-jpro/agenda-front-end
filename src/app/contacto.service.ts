import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Contacto } from './contacto';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
@Injectable({
  providedIn: 'root'
})
export class ContactoService {

 apiUrl: string = environment.API
  constructor(private httpCliente: HttpClient) { }

  salvar(contacto: Contacto): Observable<Contacto>{
    console.log(contacto)
    return this.httpCliente.post<Contacto>(this.apiUrl, contacto)
  }

}
