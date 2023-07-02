import { Component, OnInit } from '@angular/core';
import { Contacto } from '../contacto';
import { ContactoService } from '../contacto.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ContactoDetalheComponent } from './contacto-detalhe.component';
import { PaginaContacto } from './PaginaContacto';


@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit{

  formulario: FormGroup = new FormGroup('')
  contacto: Contacto
  contactos: Contacto[] = new Array
  paginaContactos: PaginaContacto[] = []
  paginaContacto: PaginaContacto = new PaginaContacto
  mensagem: string = ''
  errors: string[] = []
  colunas: string[]= ['foto', 'id', 'nome', 'email', 'favorito']
  pageSizeOptions: number[] = [5, 10, 15, 20]
  constructor(
    private contactoService: ContactoService, 
    private formBuilder: FormBuilder,
    private dialog: MatDialog){
    
    this.paginaContacto.totalElements = 0
    this.paginaContacto.pageNumber = 0
    this.paginaContacto.pageSize = 5

    this.contacto = new Contacto('','')
  }

  ngOnInit(): void {
    this.montarFormulario();
    this.listarContactos(this.paginaContacto.pageNumber , this.paginaContacto.pageSize);
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

  visualizarContacto(contato: Contacto){
    this.dialog.open(ContactoDetalheComponent, {
      width: '600px',
      height: '600px',
      data: contato
    })
  }

  listarContactos(page: number, size: number){
    this.contactoService
    .listar(page, size)
    .subscribe({
      next: response =>{
        this.contactos = response.content
        this.paginaContacto.totalElements = response.totalElements
        this.paginaContacto.pageSize = response.pageable.pageSize
        
      console.log("imprimindo o erro.")
      console.log(response)

    }, 
      error: errorResponse =>{
        console.log('Erro ao obter os contactos', errorResponse)
      }
  })
  }

  uploadFoto(event: any, contacto: Contacto){
    const files = event.target.files
    if (files){
      const foto = files[0];
      const formData: FormData = new FormData()
      formData.append('foto', foto)

      this.contactoService
          .salvarForto(contacto, formData)
          .subscribe({
            next: response => {
              this.mensagem = "Foto salva com sucesso."
              console.log(this.mensagem)
            },
            error: errorResponse => {
              this.errors = errorResponse.error.errors 
              console.log(this.errors)
            }
          })
    }
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
