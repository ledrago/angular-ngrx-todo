import {Todo} from '../models/todo.model';
import { Action, createReducer, on } from '@ngrx/store';
import * as TodoActions from "./todo.action";
import TodoState, {initializeState} from "../../app.state";

const initialState = initializeState();

const reducer = createReducer(
    initialState,
    on(TodoActions.GetTodos, state => state),
    on(TodoActions.successGetTodos, (state: TodoState, {payload}) => {
        return {...state, TodoList: payload}
    }),
    on(TodoActions.ErrorTodo, (state: TodoState, error: Error) => {
        console.log(error);
        return {...state, TodoError: error}
    })
);

export function TodoReducer(state: TodoState | undefined, action: Action) {
    return reducer(state, action)
}

