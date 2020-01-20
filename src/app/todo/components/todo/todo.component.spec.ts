import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { TodoComponent } from "./todo.component";
import TodoState, { initializeState } from "src/app/app.state";
import { MockStore, provideMockStore } from "@ngrx/store/testing";
import { provideMockActions } from "@ngrx/effects/testing";
import { cold, hot } from "jasmine-marbles";
import { Observable, of } from "rxjs";
import { Actions } from "@ngrx/effects";
import * as TodoActions from "../../store/todo.action";
import { Action, Store } from "@ngrx/store";
import { TodoService } from "../../services/todo.service";
import { TodoEffects } from "../../store/todo.effects";
import { RouterTestingModule } from "@angular/router/testing";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatCardModule } from "@angular/material/card";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserDynamicTestingModule } from "@angular/platform-browser-dynamic/testing";
import { TodoDialogComponent } from "../todo-dialog/todo-dialog.component";
import { MatFormFieldModule } from "@angular/material/form-field";

describe("TodoComponent", () => {
  let component: TodoComponent;
  let fixture: ComponentFixture<TodoComponent>;

  const initialState = { todos: initializeState() };
  let store: MockStore<{ todos: TodoState }>;
  let action$: Observable<Action>;
  let todoServiceSpy: jasmine.SpyObj<TodoService>;

  beforeEach(async(() => {
    const spy = jasmine.createSpyObj("TodoService", ["getTodos"]);

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatIconModule,
        MatButtonModule,
        MatDialogModule,
        MatCheckboxModule,
        MatCardModule,
        NoopAnimationsModule,
        MatFormFieldModule,
        ReactiveFormsModule
      ],
      declarations: [TodoComponent, TodoDialogComponent],
      providers: [
        TodoEffects,
        provideMockStore({ initialState }),
        provideMockActions(() => action$),
        { provide: TodoService, useValue: spy }
      ]
    })
      .overrideModule(BrowserDynamicTestingModule, {
        set: { entryComponents: [TodoDialogComponent] }
      })
      .compileComponents()
      .then(() => {
        (store = TestBed.get<Store<{ todos: TodoState }>>(Store)),
          (todoServiceSpy = TestBed.get(TodoService));
      });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("Todo component have news todos if new ones are created", () => {
    store.setState({ todos: { TodoList: [], TodoError: null } });
    store.refreshState();
    expect(component.todoList.length).toEqual(0);

    const todoList = [
      { id: 1, title: "title one", description: "description 1", done: false },
      { id: 2, title: "title two", description: "description 2", done: true }
    ];

    let nextState: TodoState = { TodoList: todoList, TodoError: null };

    store.setState({ todos: nextState });
    store.refreshState();

    expect(component.todoList).toEqual(todoList);
    expect(component.todoError).toEqual(null);
  });

  it("Get Todo action should load data from api", () => {
    let nextState: TodoState = {
      TodoList: [
        { id: 1, title: "title one", description: "description 1", done: false }
      ],
      TodoError: null
    };
    store.setState({ todos: nextState });

    const source = hot("a", { a: TodoActions.GetTodos });
    const actions = new Actions(source);
    const payload = [
      { id: 2, title: "title two", description: "description 2", done: true }
    ];
    todoServiceSpy.getTodos.and.returnValue(of(payload));

    const effects = new TodoEffects(actions, todoServiceSpy);
    const expected = cold("b", {
      b: { type: TodoActions.SuccessGetTodos.type, payload }
    });

    expect(effects.GetTodoList$).toBeObservable(expected);
  });
});
