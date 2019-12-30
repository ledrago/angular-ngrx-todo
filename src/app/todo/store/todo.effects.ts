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
        ofType(TodoActions.GetTodos),
        mergeMap(action => {
          return this.todosService.getTodos().pipe(
            map((data: Todo[]) => {
              return TodoActions.SuccessGetTodos({payload: data})
            }),
            catchError((error: Error) => {
              return of(TodoActions.ErrorTodo(error));
            })
          )
        })
      )
    );

    UpdateTodo$: Observable<Action> = createEffect((): any => 
    this.actions$.pipe(
      ofType(TodoActions.UpdateTodo),
      mergeMap(action => {
        return this.todosService.updateTodo(action.payload).pipe(
          map((data: Todo) => {
            return TodoActions.SuccessUpdateTodo()
          }),
          catchError((error: Error) => {
            return of(TodoActions.ErrorTodo(error))
          })
        )
      })
    )
    )
   

    
}