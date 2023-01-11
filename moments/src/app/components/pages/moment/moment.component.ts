import { Component, OnInit } from '@angular/core';
import { Moment } from 'src/app/Moment';
import { MomentService } from 'src/app/services/moment.service';
import { Route, ActivatedRoute } from '@angular/router';
import { faTimes, } from '@fortawesome/free-solid-svg-icons';
import { environment } from 'src/environments/environments';
@Component({
  selector: 'app-moment',
  templateUrl: './moment.component.html',
  styleUrls: ['./moment.component.css'],
})
export class MomentComponent implements OnInit {
  moment!: Moment
  baseApiUrl = environment.baseApiUrl
  faTimes = faTimes
  

  constructor(
    private momentService: MomentService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // id que estar na URL
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.momentService
      .getMoment(id)
      .subscribe((item) => (this.moment = item.data,console.log() ) );
      
  }
}
