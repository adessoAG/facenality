import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  /** POST: Send filled out form to the backend */
  sendQuestionnaire(questionnaire): Observable<number> {    
    return this.http.post<number>(this.apiUrl + "/save-questionnaire", questionnaire, this.httpOptions).pipe(
      tap((id) => console.log(`Your data was saved with following id: ${id}`)),
      catchError(this.handleError<number>('sendQuestionnaire'))
    );
  }

  getTestAverage(id): Observable<number []> {
    return this.http.get<number []>(`${this.apiUrl}/get-test-average/${id}`);
  }

  requestPrediction(photo): Observable<any> {
    return this.http.post<any>(this.apiUrl + "/get-prediction", photo, this.httpOptions).pipe(
      catchError(this.handleError<number>('sendQuestionnaire'))
    );
  }

  postPrediction(img): Observable<any> {
    return this.http.post<any>("http://localhost:5000/predict", img);
  }

  postPrediction2(img): Observable<any> {
    return this.http.post<any>("http://localhost:5000/predict2", img);
  }
  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error); // log to console instead

      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
