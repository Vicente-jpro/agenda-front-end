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
  contactos: Contacto[] = new Array
  mensagem: string = ''
  errors: string[] = []
  colunas: string[]= ['id', 'nome', 'email', 'favorito']

  constructor(private contactoService: ContactoService, private formBuilder: FormBuilder){
    this.contacto = new Contacto('','')
  }

  ngOnInit(): void {
    this.montarFormulario();
    this.listarContactos();
  }

  montarFormulario(){
    this.formulario = this.formBuilder.group({
      nome:['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    })
  }


  favoritar(contacto: Contacto){
    contacto.favorito = !contacto.favorito
    this.atualizar(contacto, contacto.id)
    
  }

  atualizar(contacto: Contacto, idContacto: number){
    this.contactoService
    .atualizar(contacto, idContacto)
    .subscribe({
      next: response =>{
      this.mensagem = "Contacto atualizado com sucesso."
      console.log(response);
      
    }, 
      error: errorResponse =>{
        this.mensagem = "Erro ao atualizar o contacto."
        this.errors = errorResponse.error.errors
        console.log(this.errors);
      }
  })
  }


  listarContactos(){
    this.contactoService
    .listar()
    .subscribe({
      next: response =>{

      this.contactos = response
    }, 
      error: errorResponse =>{
        console.log('Erro ao obter os contactos', errorResponse)
      }
  })
  }

  onSubmit(){
    const formularioValues = this.formulario.value
    const contacto = new Contacto(formularioValues.nome, formularioValues.email)
    this.contactoService
        .salvar(contacto)
        .subscribe({next: response =>{
          this.mensagem = 'Contacto salvo com sucesso';
          let listaContactos: Contacto[] = [...this.contactos, response]
          this.contactos = listaContactos
        },
        error: errorResponse =>{
          this.errors = errorResponse.error.errors
        }
      })
  }



}
