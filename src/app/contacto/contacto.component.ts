import { Component, OnInit } from '@angular/core';
import { Contacto } from '../contacto';
import { ContactoService } from '../contacto.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit{

  formulario: FormGroup = new FormGroup('')
  contacto: Contacto
  contactos: Contacto[] = []
  mensagem: string = ''
  errors: string[] = []

  constructor(private contactoService: ContactoService, private formBuilder: FormBuilder){
    this.contacto = new Contacto('','')
  }

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      nome:['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    })
      
  }

  onSubmit(){
    const formularioValues = this.formulario.value
    const contacto = new Contacto(formularioValues.nome, formularioValues.email)
    this.contactoService
        .salvar(contacto)
        .subscribe({next: response =>{
          this.mensagem = 'Contacto salvo com sucesso';
          this.contactos.push(response)
        },
        error: errorResponse =>{
          this.errors = errorResponse.error.errors
        }
      })
  }



}
