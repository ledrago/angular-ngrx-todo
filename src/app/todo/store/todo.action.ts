import {Todo} from '../models/todo.model';
import { createAction, props } from '@ngrx/store';

export const GetTodos = createAction(
  '[Todo] - Get todos'
);

export const BeginGetTodos = createAction('[Todo] - Begin get Todo');

export const successGetTodos = createAction(
    '[Todo] Sucess getting todos',
    props<{ payload: Todo[]}>()
);

export const ErrorTodo = createAction('[Todo] - Error', props<Error>())