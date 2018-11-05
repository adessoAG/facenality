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
    console.log(environment.apiUrl + " " + environment.production);
    
    return this.http.post<number>(this.apiUrl + "/save-questionnaire", questionnaire, this.httpOptions).pipe(
      tap((id) => console.log(`Your data was saved with following id: ${id}`)),
      catchError(this.handleError<number>('sendQuestionnaire'))
    );
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
