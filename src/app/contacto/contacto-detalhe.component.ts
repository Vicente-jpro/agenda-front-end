import { Component, Inject, OnInit} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Contacto } from '../contacto';

@Component({
  selector: 'app-contacto-detalhe',
  templateUrl: './contacto-detalhe.component.html',
})
export class ContactoDetalheComponent implements OnInit{
  constructor(
    public dialogRef: MatDialogRef<ContactoDetalheComponent>,
    @Inject(MAT_DIALOG_DATA) public contacto: Contacto
    ) { }

    ngOnInit(): void {
        
    }

    fechar(){
      
    }
}


