import {Todo} from '../models/todo.model';
import { createAction, props } from '@ngrx/store';

// Getting todo list

export const GetTodos = createAction(
  '[Todo] - Get todos'
);

export const SuccessGetTodos = createAction(
    '[Todo] Success getting todos',
    props<{ payload: Todo[]}>()
);

// Update todo

export const UpdateTodo = createAction('[Todo] - Update todo', props<{payload: Todo}>());

export const SuccessUpdateTodo = createAction(
  '[Todo] - Success updating todo'
)

// Create todo

export const CreateTodo = createAction('[Todo] - Create Todo', props<{payload: Todo}>());

export const SuccessCreateTodo = createAction('[Todo] - Success creating todo');

// Error todo

export const ErrorTodo = createAction('[Todo] - Error', props<Error>())
