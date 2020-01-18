import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { TodoDialogComponent } from "../todo-dialog/todo-dialog.component";
import { ActivatedRoute, Router } from "@angular/router";
import { select, Store } from "@ngrx/store";
import TodoState from "src/app/app.state";
import { Observable, Subscription } from "rxjs";
import { Todo } from "../../models/todo.model";
import * as TodoActions from "../../store/todo.action";

@Component({
  selector: "app-todo-detail",
  templateUrl: "./todo-detail.component.html",
  styleUrls: ["./todo-detail.component.scss"]
})
export class TodoDetailComponent implements OnInit {
  todoId: number;
  todoDetail: Todo;
  todo$: Observable<TodoState>;
  TodoDetailSubscription: Subscription;

  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private store: Store<{ todos: TodoState }>,
    private router: Router
  ) {
    this.todo$ = store.pipe(select("todos"));
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.todoId = params["id"] || null;
      this.TodoDetailSubscription = this.todo$.subscribe((state: TodoState) => {
        this.todoDetail = state.TodoList.find(el => el.id == this.todoId);
        if (this.todoDetail) {
          this.openDialog(this.todoDetail);
        }
      });
    });
  }

  openDialog(todo: Todo): void {
    this.dialog
      .open(TodoDialogComponent, {
        width: "300px",
        data: { todo }
      })
      .afterClosed()
      .subscribe(result => {
        this.TodoDetailSubscription.unsubscribe();
        if (
          result &&
          JSON.stringify(result) !== JSON.stringify(this.todoDetail)
        ) {
          this.store.dispatch(TodoActions.UpdateTodo({ payload: result }));
        }
        this.router.navigate(["/"], { relativeTo: this.route });
      });
  }
}
