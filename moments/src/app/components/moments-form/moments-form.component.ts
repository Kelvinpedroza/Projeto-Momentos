import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Moment } from 'src/app/Moment';
@Component({
  selector: 'app-moments-form',
  templateUrl: './moments-form.component.html',
  styleUrls: ['./moments-form.component.css'],
})
export class MomentsFormComponent implements OnInit {
  @Input() btnText!: string;
  @Output() onSubmit = new EventEmitter<Moment>();
  @Input() momentData!: Moment
  momentForm!: FormGroup;
  ngOnInit(): void {
    this.momentForm = new FormGroup({
      id: new FormControl(''),
      title: new FormControl(
        this.momentData ? this.momentData.title : '',
        Validators.required
      ),
      description: new FormControl(
        this.momentData ? this.momentData.description : '',
        Validators.required
      ),
      image: new FormControl(''),
    });
    console.log(this.momentData.title)
  }
  get title() {
    return this.momentForm.get('title')!;
  }
  get description() {
    return this.momentForm.get('description')!;
  }
  onFileSelect(event: any) {
    const file: File = event.target.files[0];
    this.momentForm.patchValue({ image: file });
  }

  submit() {
    if (this.momentForm.invalid) {
      return;
    }
    console.log(this.momentForm.value);

    this.onSubmit.emit(this.momentForm.value);
  }
}
