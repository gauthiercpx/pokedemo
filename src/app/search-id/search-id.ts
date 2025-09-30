import { Component } from '@angular/core';
import { Pokemon } from '../pokemon';

@Component({
  selector: 'app-search-id',
  standalone: false,
  templateUrl: './search-id.html',
  styleUrl: './search-id.css',
})
export class SearchId {
  updateSelectedPokemon() {
    this.selectedPokemon = this.pokemons.find((p) => p.id === this.selectedId);
  }
  searchById(arg0: string) {
    throw new Error('Method not implemented.');
  }
  idSource: string = '';
  idReadonly: string = '';

  pokemons: Pokemon[] = [
    new Pokemon(1, 'Bulbasaur'),
    new Pokemon(4, 'Charmander'),
    new Pokemon(7, 'Squirtle'),
    new Pokemon(25, 'Pikachu'),
  ];

  selectedId?: number;
  selectedPokemon?: Pokemon;
}
