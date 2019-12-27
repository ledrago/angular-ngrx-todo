import {InMemoryDbService} from 'angular-in-memory-web-api'
import { Todo } from '../models/todo.model'
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService implements InMemoryDbService {

  constructor() { }
  createDb(){

    let  todos: Todo[] =  [
 {title: "Faire les courses de Noël", done: true},
 {title: "Acheter les cadeaux pour Steven", done: true},
 {title: "Appeler Guillermo", done: false},
 {title: "Faire le ménage", done: false}
    ];
 
    return {todos};
 
   }
}
