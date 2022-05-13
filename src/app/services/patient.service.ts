import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { PatientsData } from '../patient.model'

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  readonly patientListUrl = 'https://try.smilecdr.com/baseR4/Patient';

  constructor(private http: HttpClient) {}

  getPatients(): Observable<PatientsData> {
    return this.http.get<PatientsData>(this.patientListUrl).pipe(
      tap((data) => {}),
      catchError(this.handleError)
    );
  }

  private handleError(err: any): Observable<never> {
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Backend returned code ${err.status}: ${err.statusText}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }
}
