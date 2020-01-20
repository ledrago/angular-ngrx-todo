import { Component, OnInit } from "@angular/core";
import { Todo } from "../../models/todo.model";
import { select, Store } from "@ngrx/store";
import TodoState from "src/app/app.state";
import { map } from "rxjs/operators";
import { Observable, Subscription } from "rxjs";
import * as TodoActions from "../../store/todo.action";
import { MatCheckbox } from "@angular/material/checkbox";
import { MatDialog } from "@angular/material/dialog";
import { TodoDialogComponent } from "../todo-dialog/todo-dialog.component";

@Component({
  selector: "app-todo",
  templateUrl: "./todo.component.html",
  styleUrls: ["./todo.component.scss"]
})
export class TodoComponent implements OnInit {
  todoList: Todo[] = [];
  todo$: Observable<TodoState>;
  TodoSubscription: Subscription;
  todoError: Error = null;

  constructor(
    private store: Store<{ todos: TodoState }>,
    public dialog: MatDialog
  ) {
    this.todo$ = store.pipe(select("todos"));
  }

  ngOnInit() {
    this.TodoSubscription = this.todo$
      .pipe(
        map(x => {
          this.todoList = x.TodoList;
          this.todoError = x.TodoError;
        })
      )
      .subscribe();

    this.store.dispatch(TodoActions.GetTodos());
  }

  changeTodoState(todo: Todo, checkbox: MatCheckbox): void {
    todo.done = checkbox.checked;
    this.store.dispatch(TodoActions.UpdateTodo({ payload: todo }));
  }

  newTodo(): void {
    this.dialog
      .open(TodoDialogComponent, {
        width: "300px"
      })
      .afterClosed()
      .subscribe(result => {
        if (result) {
          result.id = this.todoList.length + 1;
          this.store.dispatch(TodoActions.CreateTodo({ payload: result }));
        }
      });
  }
}
