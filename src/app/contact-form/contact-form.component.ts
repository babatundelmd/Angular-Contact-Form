import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, NgForm } from '@angular/forms'
import { ServicesService } from '../services.service';
import { ContactModel } from '../model.ts/contact-model';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {
  FormData: FormGroup;
  loading: boolean = false;
  constructor(private builder: FormBuilder, private contact: ServicesService) { }

  ngOnInit() {
    this.FormData = this.builder.group({
      Fullname: new FormControl('', [Validators.required]),
      Email: new FormControl('', [Validators.compose([Validators.required, Validators.email])]),
      Comment: new FormControl('', [Validators.required])
    });
  }


  onSubmit(FormData: NgForm) {
    this.loading = true;
    console.log(FormData)
    this.contact.PostMessage(this.FormData.value).pipe(
      finalize(() => {
        this.loading = false;
      })
    )
      .subscribe(response => {
        location.href = 'https://mailthis.to/confirm'
        console.log(response)
      }, error => {
        console.warn(error.responseText)
        console.log({ error })
      })
  }
}
