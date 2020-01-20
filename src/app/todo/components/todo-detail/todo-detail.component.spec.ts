import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { TodoDetailComponent } from "./todo-detail.component";
import { MatDialogModule } from "@angular/material/dialog";
import { RouterTestingModule } from "@angular/router/testing";
import { StoreModule } from "@ngrx/store";
import { TodoReducer } from "../../store/todo.reducer";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserDynamicTestingModule } from "@angular/platform-browser-dynamic/testing";
import { TodoDialogComponent } from "../todo-dialog/todo-dialog.component";
import { MatFormFieldModule } from "@angular/material/form-field";
import { ReactiveFormsModule } from "@angular/forms";
import { MatCheckboxModule } from "@angular/material/checkbox";

describe("TodoDetailComponent", () => {
  let component: TodoDetailComponent;
  let fixture: ComponentFixture<TodoDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TodoDetailComponent, TodoDialogComponent],
      imports: [
        MatDialogModule,
        RouterTestingModule,
        NoopAnimationsModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatCheckboxModule,
        StoreModule.forRoot({ todos: TodoReducer }),
        StoreDevtoolsModule.instrument({
          maxAge: 10
        })
      ]
    })
      .overrideModule(BrowserDynamicTestingModule, {
        set: { entryComponents: [TodoDialogComponent] }
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
