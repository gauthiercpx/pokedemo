import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SearchId } from '../search-id/search-id';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: true,
  imports: [RouterOutlet, SearchId],
  styleUrl: './app.css'
})
export class App {
  readonly title = signal('pokedemo');
}
