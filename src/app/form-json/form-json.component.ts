import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import {
  Validators,
  FormBuilder,
  FormControl,
  FormGroup,
  AbstractControl,
} from '@angular/forms';

export interface form {
  formGroup: FormGroup;
  metaData: any[];
}

@Component({
  selector: 'app-form-json',
  templateUrl: './form-json.component.html',
  styleUrls: ['./form-json.component.css'],
})
export class FormJsonComponent implements OnInit {
  form: form;
  @Input() jsonData: any;
  @Input() debug: boolean = false;
  @Output() output: EventEmitter<FormGroup> = new EventEmitter();
  fg: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    if (this.jsonData == null) return;
    let dataObject = this.jsonData;
    let objectProps = Object.keys(dataObject).map((prop) => {
      return Object.assign({}, { key: prop }, dataObject[prop]);
    });
    debugger;
    const formGroup = {};
    for (let prop of Object.keys(dataObject)) {
      formGroup[prop] = new FormControl(
        dataObject[prop].value || '',
        this.mapValidators(dataObject[prop].validation)
      );
    }

    this.fg = new FormGroup(formGroup);
    const form: form = {
      formGroup: this.fg,
      metaData: objectProps,
    };
    this.fg.valueChanges.subscribe((values) => {
      this.output.emit(this.fg);
    });
    this.form = form;
    return form;
  }

  private mapValidators(validators) {
    const formValidators = [];

    if (validators) {
      for (const validation of Object.keys(validators)) {
        if (validation === 'required') {
          formValidators.push(Validators.required);
        } else if (validation === 'minLength') {
          formValidators.push(Validators.minLength(validators[validation]));
        } else if (validation === 'maxLength') {
          formValidators.push(Validators.maxLength(validators[validation]));
        }
      }
    }

    return formValidators;
  }

  public hasValidator(controlName: string, validator: string): boolean {
    let control: AbstractControl = this.fg.controls[controlName];
    switch (validator) {
      case 'required':
        control.setValue('');
      case 'pattern':
        control.setValue('3');
    }
    if (control.validator != null && control.validator(control) != null) {
      let hasValidator: boolean = !!control
        .validator(control)
        .hasOwnProperty(validator);
      return hasValidator;
    }
    return false;
  }

  onSubmit(form: any) {}
}
