// Module

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule  } from 'angular-in-memory-web-api';

// Services

import {DataService} from "./todo/services/data.service";

// Components

import { AppComponent } from './app.component';
import { TodoComponent } from './todo/components/todo.component';
import { StoreModule } from '@ngrx/store';
import { TodoReducer } from './todo/store/todo.reducer';
import { EffectsModule } from '@ngrx/effects';
import { TodoEffects } from './todo/store/todo.effects';

// Angular material

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatCardModule} from '@angular/material/card';


@NgModule({
  declarations: [
    AppComponent,
    TodoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    // Api and store

    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(DataService),
    StoreModule.forRoot({ todos: TodoReducer }),
    EffectsModule.forRoot([TodoEffects]),

    // Angular Material

    MatCardModule,
    BrowserAnimationsModule,
    MatCheckboxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
