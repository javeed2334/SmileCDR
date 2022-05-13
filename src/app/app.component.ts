import { Component, OnInit, VERSION } from '@angular/core';
import { Patient, PatientsData } from './patient.model';
import { DataShareService } from './services/data-share.service';
import { PatientService } from './services/patient.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  patientList = [];
  elapsedTime: any = '';
  fName = '';
  lName = '';

  json: any = {
    allergies: {
      label: 'Do you have allergies',
      value: 'T',
      type: 'radio',
      options: [
        { label: 'True', value: 'T' },
        { label: 'False', value: 'F' },
      ],
    },
    gender: {
      label: 'What is your gender',
      value: 'M',
      type: 'select',
      options: [
        { label: 'Male', value: 'M' },
        { label: 'Female', value: 'F' },
        { label: 'Other', value: 'O' },
      ],
      validation: {
        required: true,
      },
    },
    comment: {
      label: 'country of birth',
      value: null,
      type: 'text',
      validation: {
        required: true,
        minLength: 5,
        maxLength: 15,
      },
    },
    marriage: {
      label: 'What is your marital status',
      value: '',
      type: 'select',
      options: [
        { label: 'Married', value: 'M' },
        { label: 'Single', value: 'S' },
        { label: 'Divorced', value: 'D' },
      ],
      validation: {
        required: true,
      },
    },
    smoke: {
      label: 'Do you Smoke',
      value: 'F',
      type: 'radio',
      options: [
        { label: 'True', value: 'T' },
        { label: 'False', value: 'F' },
      ],
    },
    alchohol: {
      label: 'Do you drink alchohol?',
      value: 'F',
      type: 'radio',
      options: [
        { label: 'True', value: 'T' },
        { label: 'False', value: 'F' },
      ],
    },
  };

  constructor(
    private patientService: PatientService,
    private dataShareService: DataShareService
  ) {
    this.dataShareService.SharingData.subscribe((data: any) => {
      this.elapsedTime = data;
    });
  }

  ngOnInit(): void {
    this.patientService.getPatients().subscribe((record: PatientsData) => {
      this.sortPatients(record.entry);
    });
  }

  sortPatients(patients: Patient[]) {
    patients.sort((p1, p2) => {
      const nameOrder = p1.resource?.name?.[0].family.localeCompare(
        p2.resource?.name?.[0].family
      );
      const dobOrder =
        +new Date(p1.resource?.birthDate) - +new Date(p2.resource?.birthDate);
      // const dobOrder = (p1.resource?.birthDate).localeCompare(p2.resource?.birthDate);
      return nameOrder || dobOrder;
    });
    this.patientList = patients;
  }

  public inputValidator(event: any) {
    debugger;
    console.log(event.target.value);
    const pattern = /^[a-zA-Z]*$/;
    //let inputChar = String.fromCharCode(event.charCode)
    if (!pattern.test(event.target.value)) {
      event.target.value = event.target.value.replace(/[^a-zA-Z]/g, '');
      event.preventDefault();
    }
  }
}
