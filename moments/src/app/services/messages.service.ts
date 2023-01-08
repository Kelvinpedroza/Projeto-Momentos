import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  message: string = ''

  constructor() { }

  add(messagem:string){
    this.message = messagem

    setTimeout(() =>{
      this.clear()
    },4000)
  }
  clear(){
    this.message = ''
  }
}
