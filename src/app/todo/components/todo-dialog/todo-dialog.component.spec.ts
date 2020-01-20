import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { TodoDialogComponent } from "./todo-dialog.component";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { ReactiveFormsModule } from "@angular/forms";
import { MatCheckboxModule } from "@angular/material/checkbox";
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog
} from "@angular/material/dialog";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserDynamicTestingModule } from "@angular/platform-browser-dynamic/testing";

describe("TodoDialogComponent", () => {
  let component: TodoDialogComponent;
  let fixture: ComponentFixture<TodoDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TodoDialogComponent],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: [] }
      ],
      imports: [
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        MatCheckboxModule,
        MatDialogModule,
        NoopAnimationsModule
      ]
    })
      .overrideModule(BrowserDynamicTestingModule, {
        set: { entryComponents: [TodoDialogComponent] }
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("form without title should be invalid", () => {
    let description = component.todoForm.get("description");
    let title = component.todoForm.get("title");
    description.setValue("test description");
    expect(component.todoForm.valid).toBeFalsy();
    title.setValue("Test title");
    expect(component.todoForm.valid).toBeTruthy();
  });

  it("if var todoDetail has data, todoform should patch it", () => {
    component.todoDetail = {
      id: 1,
      title: "test title",
      description: "",
      done: true
    };
    let title = component.todoForm.get("title");
    let form = component.todoForm;
    if (component.todoDetail) {
      form.patchValue({
        title: component.todoDetail.title,
        description: component.todoDetail.description,
        done: component.todoDetail.done
      });
    }

    expect(title.value).toBe("test title");
  });
});
