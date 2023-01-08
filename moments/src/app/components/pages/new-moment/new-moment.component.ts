import { MomentService } from './../../../services/moment.service';
import { Component } from '@angular/core';
import { Moment } from 'src/app/Moment';
import { Router } from '@angular/router';
@Component({
  selector: 'app-new-moment',
  templateUrl: './new-moment.component.html',
  styleUrls: ['./new-moment.component.css'],
})
export class NewMomentComponent {
  btnText = 'Compartilhar!';
  constructor(private momentService: MomentService, private router: Router) {}
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

    // exibir msg

    // redirect
    this.router.navigate(['/']);
  }
}
