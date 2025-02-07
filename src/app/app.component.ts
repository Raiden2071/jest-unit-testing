import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodosComponent } from './todos/todos.component';

@Component({
  selector: 'app-root',
  imports: [CommonModule, TodosComponent],
  standalone: true,
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'angular-testing-course';
}
