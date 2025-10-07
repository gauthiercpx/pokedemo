import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../pokemon';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { PokeAPI } from '../poke-api';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-search-id',
  standalone: false,
  templateUrl: './search-id.html',
  styleUrl: './search-id.css',
})
export class SearchId implements OnInit {
  idSource: Number | null = null;
  idReadonly: Number | null = null;
  selectedPokemon?: Pokemon;
  filterText: string = '';
  show: boolean = false;

  constructor(private pokeAPI: PokeAPI) {}

  updateSelectedPokemon() {
    this.show = false;
    this.selectedPokemon = this.pokemons.find((p) => p.id === Number(this.idReadonly));
    this.idSource = null;
  }
  searchById(arg0: Number | null) {
    if (this.idSource !== null) {
      this.idReadonly = this.idSource;
    } else {
      this.idReadonly = arg0;
    }
    this.updateSelectedPokemon();
    this.show = true;
  }

  pokemons: Pokemon[] = [
    new Pokemon(1, 'Bulbasaur'),
    new Pokemon(4, 'Charmander'),
    new Pokemon(7, 'Squirtle'),
    new Pokemon(25, 'Pikachu'),
  ];

  filteredPokemons: Pokemon[] = [];

  ngOnInit() {
    this.pokeAPI.getPokemonById(undefined, 50, 0).subscribe((data: any) => {
      this.pokemons = data.results; // chaque élément a un 'name' et 'url'
      console.log(this.pokemons);
    });
  }

  
  filterPokemon(event: any) {
    const query = event.query.toLowerCase();
    this.filteredPokemons = this.pokemons.filter((p) => p.name.toLowerCase().includes(query));
  }
}
