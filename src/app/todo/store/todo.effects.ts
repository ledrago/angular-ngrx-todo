// Modules

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { Action } from '@ngrx/store';

// Actions

import * as TodoActions from './todo.action';

// Model 

import {Todo} from "../models/todo.model";

// Services

import {TodoService} from '../services/todo.service';


@Injectable()
export class TodoEffects {
    
    constructor(private actions$: Actions,
      private todosService: TodoService) {}

      GetTodoList$: Observable<Action> = createEffect((): any =>
      this.actions$.pipe(
        ofType(TodoActions.BeginGetTodos),
        mergeMap(action => {
          console.log('actions')
          return this.todosService.getTodos().pipe(
            map((data: Todo[]) => {
              return TodoActions.successGetTodos({payload: data})
            }),
            catchError((error: Error) => {
              return of(TodoActions.ErrorTodo(error));
            })
          )
        })
      )
    );
   

    
}