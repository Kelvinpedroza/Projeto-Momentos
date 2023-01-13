import { Component, OnInit } from '@angular/core';
import { Moment } from 'src/app/Moment';
import { MomentService } from 'src/app/services/moment.service';
import { Router, ActivatedRoute } from '@angular/router';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { environment } from 'src/environments/environments';
import { MessagesService } from 'src/app/services/messages.service';
import { Comment } from 'src/app/Comment';
import { FormGroup,FormControl,Validators,FormGroupDirective } from '@angular/forms';
import { CommentService } from 'src/app/services/comment.service';

@Component({
  selector: 'app-moment',
  templateUrl: './moment.component.html',
  styleUrls: ['./moment.component.css'],
})
export class MomentComponent implements OnInit {
  moment!: Moment;
  baseApiUrl = environment.baseApiUrl;
  faTimes = faTimes;
  commentForm!: FormGroup

  constructor(
    private momentService: MomentService,
    private router: Router,
    private route: ActivatedRoute,
    private serviceMenssage: MessagesService,
    private comentService: CommentService
  ) {}

  ngOnInit(): void {
    // id que estar na URL
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.momentService.getMoment(id).subscribe((item) => (this.moment = item.data));
    
    this.commentForm = new FormGroup({
      text: new FormControl('',Validators.required),
      username : new FormControl('',Validators.required)
    })
    
  }
  get text(){
    return this.commentForm.get('text')!
  }
  get username(){
    return this.commentForm.get('username')!
  }
  
  get momentTitle() { return (this.moment && this.moment.title) ? this.moment.title : null }
  get momentImage() { return (this.moment && this.moment.image) ? this.moment.image : null }
  get momentDescription() { return (this.moment && this.moment.description) ? this.moment.description : null }
  get momentId() { return (this.moment && this.moment.id) ? this.moment.id : null }


  async removeHandler(id: number) {
    await this.momentService.removeHandler(id).subscribe();
    this.serviceMenssage.add('Momento excluido com sucesso! ')
    this.router.navigate(['/']);
  }
  async  onSubmit(formDirective:FormGroupDirective){

    if(this.commentForm.invalid){
      return
    }

    const data : Comment = this.commentForm.value
    data.momentId = Number(this.momentId)
    console.log(data.momentId)
    await this.comentService.createComent(data).subscribe((comment)=> this.moment.comments?.push(comment.data,))

    this.serviceMenssage.add('Comentario adicionado!')
    
    this.commentForm.reset()
    formDirective.resetForm()
  }
}
