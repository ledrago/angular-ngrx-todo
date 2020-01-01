import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TodoComponent } from 'src/app/todo/components/todo/todo.component';
import { TodoDetailComponent } from './todo/components/todo-detail/todo-detail.component';


const routes: Routes = [
    { 
      path: '', 
      component: TodoComponent, 
      children: [
        {path: ':id', component: TodoDetailComponent}
      ] 
    },
    { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
