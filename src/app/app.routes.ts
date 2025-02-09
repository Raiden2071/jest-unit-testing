import { Routes } from '@angular/router';
import { TodosComponent } from './todos/todos.component';
import { PostsComponent } from './posts/posts.component';

export const routes: Routes = [
  {
    path: 'posts', component: PostsComponent,
  },
  {
    path: 'todos', component: TodosComponent,
  }
];
