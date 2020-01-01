import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { Todo } from '../../models/todo.model';
import { Store } from '@ngrx/store';
import TodoState from 'src/app/app.state';

@Component({
  selector: 'app-todo-dialog',
  templateUrl: './todo-dialog.component.html',
  styleUrls: ['./todo-dialog.component.scss']
})
export class TodoDialogComponent implements OnInit {
  todoDetail: Todo;
  todoForm = this.fb.group({
    id: [null],
    title: [null, Validators.required],
    description: [null],
    done: [null]
  })

  constructor(
    public dialogRef: MatDialogRef<TodoDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
    ) { }

    ngOnInit() {
      if (this.data) {
        this.todoDetail = this.data.todo;

        if(this.todoDetail) {
          this.todoForm.patchValue({
            id: this.todoDetail.id,
            title: this.todoDetail.title,
            description: this.todoDetail.description,
            done: this.todoDetail.done
          })
        }
      }
      
    }
}
