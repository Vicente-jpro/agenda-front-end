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
  mensagem: string = ''
  errors: string[] = []

  constructor(private contactoService: ContactoService, private formBuilder: FormBuilder){
    this.contacto = new Contacto
  }

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      nome:['', Validators.required],
      email: ['', Validators.email]
    })
      
  }

  onSubmit(){
    console.log(this.formulario.value)
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
