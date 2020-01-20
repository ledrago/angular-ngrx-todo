import { Todo } from "../models/todo.model";
import { Action, createReducer, on } from "@ngrx/store";
import * as TodoActions from "./todo.action";
import TodoState, { initializeState } from "../../app.state";

const initialState = initializeState();

const reducer = createReducer(
  initialState,
  on(TodoActions.SuccessGetTodos, (state: TodoState, { payload }) => {
    return { ...state, TodoList: sortByBooleanProp(payload, "done") };
  }),
  on(TodoActions.CreateTodo, (state: TodoState, { payload }) => {
    return {
      ...state,
      TodoList: [payload, ...state.TodoList],
      TodoError: null
    };
  }),
  on(TodoActions.UpdateTodo, (state: TodoState, { payload }) => {
    const updateTodos = state.TodoList.map(el => {
      if (el.id === payload.id) {
        return payload;
      } else {
        return el;
      }
    });
    return {
      ...state,
      TodoList: sortByBooleanProp(updateTodos, "done"),
      TodoError: null
    };
  }),
  on(TodoActions.ErrorTodo, (state: TodoState, error: Error) => {
    console.log(error);
    return { ...state, TodoError: error };
  })
);

function sortByBooleanProp(payload: Todo[], property: string): Todo[] {
  return payload.sort((a: any, b: any) => a && b && a[property] - b[property]);
}

export function TodoReducer(state: TodoState | undefined, action: Action) {
  return reducer(state, action);
}
