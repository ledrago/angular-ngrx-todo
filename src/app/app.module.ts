// Module

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule  } from 'angular-in-memory-web-api';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

// Services

import {DataService} from "./todo/services/data.service";

// Components

import { AppComponent } from './app.component';
import { TodoComponent } from './todo/components/todo/todo.component';
import { StoreModule } from '@ngrx/store';
import { TodoReducer } from './todo/store/todo.reducer';
import { EffectsModule } from '@ngrx/effects';
import { TodoEffects } from './todo/store/todo.effects';

// Angular material

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
import { TodoDialogComponent } from './todo/components/todo-dialog/todo-dialog.component';
import { TodoDetailComponent } from './todo/components/todo-detail/todo-detail.component';
import {MatInputModule} from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';


@NgModule({
  declarations: [
    AppComponent,
    TodoComponent,
    TodoDialogComponent,
    TodoDetailComponent 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,


    // Api and store

    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(DataService),
    StoreModule.forRoot({ todos: TodoReducer }),
    EffectsModule.forRoot([TodoEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 10
    }),

    // Angular Material

    MatCardModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  entryComponents: [TodoDialogComponent],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
