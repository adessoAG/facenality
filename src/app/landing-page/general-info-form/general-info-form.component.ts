import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'landing-page-general-info-form',
  templateUrl: './general-info-form.component.html',
  styleUrls: ['./general-info-form.component.css']
})
export class GeneralInfoFormComponent implements OnInit {

  generalInfoForm: FormGroup;

  constructor(formBuilder: FormBuilder) {
    this.generalInfoForm = formBuilder.group({
      'age': ['', Validators.compose([
        Validators.required, this.ageValidator])],
      'gender': ['Male', Validators.required],
      'email': ['', Validators.email],
      /* pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$') */
      'agreedToTerms': ['false', Validators.required]
    });
  }

  ngOnInit() {
  }

  emailValidator(control: FormControl): { [s: string]: boolean } {
    if (!control.value.match(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/)) {
      return { invalidEmail: true };
    }
  }

  ageValidator(control: FormControl): { [s: string]: boolean } {
    if (control.value < 13) {
      return { invalidAge: true };
    }
  }

  onSubmit(form: FormGroup): void {

    console.log('you submitted value:', form);

  }

}
