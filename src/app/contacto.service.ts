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

  atualizar(contacto: Contacto, idContacto: number): Observable<Contacto>{
    return this.httpCliente.patch<Contacto>(`${this.apiUrl}/${idContacto}`, contacto)
  }

  salvarForto(contacto: Contacto, formData: FormData): Observable<any>{
    return this.httpCliente.put(`${this.apiUrl}/${contacto.id}/foto`, formData)
  }
  
  listar(): Observable<Contacto[]>{
    return this.httpCliente.get<Contacto[]>(this.apiUrl);
  }

}
