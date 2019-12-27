import {Injectable} from '@angular/core';
import {Todo} from './../models/todo.model';
import { environment } from '../../../environments/environment'
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  SERVER_URL: string = environment.apiUrl;

  constructor(private http: HttpClient) {

  }

  getTodos(): Observable<Todo[]> {
    const url = `${this.SERVER_URL}/todos`;
    return this.http.get<Todo[]>(url);
  }


  
}
