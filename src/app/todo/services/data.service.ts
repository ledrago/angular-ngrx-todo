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
 {id: 1, title: "Faire les courses de Noël", done: true},
 {id: 2, title: "Acheter les cadeaux pour Steven", done: true},
 {id: 3, title: "Appeler Guillermo", done: false},
 {id: 4, title: "Faire le ménage", done: false}
    ];
 
    return {todos};
 
   }
}
