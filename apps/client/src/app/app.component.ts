import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';  // Import RouterModule for router-outlet

@Component({
  standalone: true,
  imports: [RouterModule],  // <-- Add RouterModule here
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'client';
}
