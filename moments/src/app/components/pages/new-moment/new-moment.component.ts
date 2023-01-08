import { MomentService } from './../../../services/moment.service';
import { Component } from '@angular/core';
import { Moment } from 'src/app/Moment';
import { Router } from '@angular/router';
import { MessagesService } from 'src/app/services/messages.service';
@Component({
  selector: 'app-new-moment',
  templateUrl: './new-moment.component.html',
  styleUrls: ['./new-moment.component.css'],
})
export class NewMomentComponent {
  btnText = 'Compartilhar!';
  constructor(private momentService: MomentService, private router: Router, private messageService: MessagesService) {}
  async createHandler(moment: any) {
    const formData = new FormData();
    formData.append('title', moment.title);
    formData.append('description', moment.description);

    if (moment.image) {
      formData.append('image', moment.image);
    }

    // todo

    // enviar para o service
    await this.momentService.createMoment(formData).subscribe();

    this.messageService.add('Momento adicionado com sucesso! ')


    // redirect
    this.router.navigate(['/']);
  }
}
