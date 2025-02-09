import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterModule],
  standalone: true,
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'angular-testing-course';
}
