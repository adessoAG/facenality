import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'landing-page-general-info-form',
  templateUrl: './general-info-form.component.html',
  styleUrls: ['./general-info-form.component.css']
})
export class GeneralInfoFormComponent implements OnInit {

  generalInfoForm: FormGroup;

  constructor(formBuilder: FormBuilder) {
    this.generalInfoForm = formBuilder.group({  
      'age': [''],
      'gender': ['Male'],
      'email': [''],
      'agreedToTerms': ['false']  
    });  
   }

  ngOnInit() {
  }

  onSubmit(form: any): void {  
    console.log('you submitted value:', form);  
  }

}
