import {Todo} from '../models/todo.model';
import { createAction, props } from '@ngrx/store';

// Getting todo list

export const GetTodos = createAction(
  '[Todo] - Get todos'
);

// export const BeginGetTodos = createAction('[Todo] - Begin get Todo');

export const SuccessGetTodos = createAction(
    '[Todo] Success getting todos',
    props<{ payload: Todo[]}>()
);

// Update todo

export const UpdateTodo = createAction('[Todo] - Update todo', props<{payload: Todo}>());

// export const BeginUpdateTodo = createAction('[Todo] - Begin update todo', props<{payload: Todo}>())

export const SuccessUpdateTodo = createAction(
  '[Todo] - Success updating todo'
)

export const ErrorTodo = createAction('[Todo] - Error', props<Error>())