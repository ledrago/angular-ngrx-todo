import {Component, OnInit} from '@angular/core';
import {Todo} from '../models/todo.model';
import { select, Store } from '@ngrx/store';
import TodoState from 'src/app/app.state';
import { map } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import * as TodoActions from "../store/todo.action";

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  todoList: Todo[] = [];
  todo$: Observable<TodoState>;
  TodoSubscription: Subscription;
  todoError: Error = null;

  constructor(private store: Store<{todos: TodoState}>) {
    this.todo$ = store.pipe(select('todos'))
  }

  ngOnInit() {
    this.TodoSubscription = this.todo$.pipe(
      map(x => {
        console.log('x : ', x)
        this.todoList = x.TodoList;
        this.todoError = x.TodoError;
        console.log('todolist : ', this.todoList)
      })
    ).subscribe();

    this.store.dispatch(TodoActions.BeginGetTodos());
    
  }

}
