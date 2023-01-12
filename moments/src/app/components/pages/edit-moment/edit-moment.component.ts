import { Component, OnInit } from '@angular/core';
import { Moment } from 'src/app/Moment';
import { MomentService } from 'src/app/services/moment.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-edit-moment',
  templateUrl: './edit-moment.component.html',
  styleUrls: ['./edit-moment.component.css'],
})
export class EditMomentComponent implements OnInit {
  moment!: Moment;
  btnText: string = 'Editar';
  constructor(
    private momentService: MomentService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.momentService
      .getMoment(id)
      .subscribe((item) => (this.moment = item.data));
  }
  get momentTitle() {
    return this.moment && this.moment.title ? this.moment.title : null;
  }
  get momentImage() {
    return this.moment && this.moment.image ? this.moment.image : null;
  }
  get momentDescription() {
    return this.moment && this.moment.description
      ? this.moment.description
      : null;
  }
  get momentId() {
    return this.moment && this.moment.id ? this.moment.id : null;
  }
  editHandler(event:any){
    console.log('teste')
  }
}
