import {Injectable} from '@angular/core';
import {Todo} from './../models/todo.model';
import { environment } from '../../../environments/environment'
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  SERVER_URL: string = environment.apiUrl;

  constructor(private http: HttpClient) {

  }

  getTodos(): Observable<Todo[]> {
    const url = `${this.SERVER_URL}/todos`;
    return this.http.get<Todo[]>(url).pipe(
      catchError((error: HttpErrorResponse) => this.handleError(error))
    );
  }

  updateTodo(todo: Todo): Observable<Todo> {
    const url = `${this.SERVER_URL}/todos/${todo.id}`;
    return this.http.put<Todo>(url, todo).pipe(
      catchError((error: HttpErrorResponse) => this.handleError(error))
    )
  }

  createTodo(todo: Todo): Observable<Todo> {
    const url = `${this.SERVER_URL}/todos`;
    return this.http.post<Todo>(url, todo).pipe(
      catchError((error: HttpErrorResponse) => this.handleError(error))
    )
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };


  
}
