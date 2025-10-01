import { Component } from '@angular/core';
import { Pokemon } from '../pokemon';
import { AutoCompleteModule } from 'primeng/autocomplete';

@Component({
  selector: 'app-search-id',
  standalone: false,
  templateUrl: './search-id.html',
  styleUrl: './search-id.css',
})
export class SearchId {
  idSource: Number | null = 0;
  idReadonly: Number | null = 0;
  selectedPokemon?: Pokemon;
  filterText: string = '';

  updateSelectedPokemon() {
    this.selectedPokemon = this.pokemons.find((p) => p.id === Number(this.idReadonly));
    this.idReadonly = Number(this.idSource);
    this.idSource = null;
  }
  searchById(arg0: Number | null) {
      this.idReadonly = Number(arg0);
      this.updateSelectedPokemon();
    }

  pokemons: Pokemon[] = [
    new Pokemon(1, 'Bulbasaur'),
    new Pokemon(4, 'Charmander'),
    new Pokemon(7, 'Squirtle'),
    new Pokemon(25, 'Pikachu'),
  ];

  filteredPokemons: Pokemon[] = [];

  filterPokemon(event: any) {
    const query = event.query.toLowerCase();
    this.filteredPokemons = this.pokemons.filter((p) => p.name.toLowerCase().includes(query));
  }
}
