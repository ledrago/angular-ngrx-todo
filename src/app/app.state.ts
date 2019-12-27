import {Todo} from './todo/models/todo.model';

export default class TodoState {
    TodoList: Array<Todo>;
    TodoError: Error;
}

export const initializeState  = (): TodoState => {
    return { TodoList: Array<Todo>(), TodoError: null };
  };



