import { InMemoryDbService } from "angular-in-memory-web-api";
import { Todo } from "../models/todo.model";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class DataService implements InMemoryDbService {
  constructor() {}
  createDb() {
    let todos: Todo[] = [
      {
        id: 1,
        title: "Faire les courses de Noël",
        description: "Aller à Darty plutôt qu'à la fnac",
        done: true
      },
      {
        id: 2,
        title: "Acheter les cadeaux pour Steven",
        description: "Peut être un dvd",
        done: true
      },
      { id: 3, title: "Appeler Guillermo", description: "", done: false },
      {
        id: 4,
        title: "Faire le ménage",
        description: "Penser à acheter du desktop",
        done: false
      }
    ];

    return { todos };
  }
}
