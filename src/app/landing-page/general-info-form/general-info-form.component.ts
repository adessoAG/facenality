import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'landing-page-general-info-form',
  templateUrl: './general-info-form.component.html',
  styleUrls: ['./general-info-form.component.css']
})
export class GeneralInfoFormComponent implements OnInit {

  form: FormGroup;
  @Output() formResults = new EventEmitter<FormGroup>();

  constructor(formBuilder: FormBuilder) {
    this.form = formBuilder.group({
      'age': [''],
      'gender': ['0'],
      // Validators.email allows invalid emails with missing domains like 
      // test@test instead of test@test.de
      'email': ['', Validators.compose([Validators.required, Validators.email])],
      'agreedToTerms': ['', Validators.requiredTrue]
    });
  }

  ngOnInit() { }

  emailValidator(control: FormControl): { [s: string]: boolean } {
    if (!control.value.match(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/)) {
      return { invalidEmail: true };
    }
  }

  ageValidator(control: FormControl): { [returnValue: string]: boolean } {
    if (control.value < 13) {
      return { invalidAge: true };
    }
  }

  onSubmit(): void {
    this.formResults.emit(this.form)
  }

}
