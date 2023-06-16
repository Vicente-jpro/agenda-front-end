export  class Contacto {
    id: number = 0
    nome: string = ''
    email: string = ''
    favorito: boolean = false

    constructor(nome: string, email: string){
        this.nome = nome
        this.email = email
    }

    
}
