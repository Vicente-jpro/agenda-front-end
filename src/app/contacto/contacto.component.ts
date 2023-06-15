import { Component, OnInit } from '@angular/core';
import { Contacto } from '../contacto';
import { ContactoService } from '../contacto.service';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit{

  contacto: Contacto
  mensagem: string = ''
  errors: string[] = []

  constructor(private contactoService: ContactoService){
    this.contacto = new Contacto
  }

  ngOnInit(): void {
      
  }

  onSubmit(){
    console.log(this.contacto)
    this.contactoService
        .salvar(this.contacto)
        .subscribe({next: response =>{
          this.mensagem = 'Contacto salvo com sucesso';
        },
        error: errorResponse =>{
          this.errors = errorResponse.error.errors
        }
      })
  }



}
