import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../pokemon';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { PokeAPI } from '../poke-api';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-search-id',
  standalone: false,
  templateUrl: './search-id.html',
  styleUrl: './search-id.css',
})
export class SearchId implements OnInit {
  idSource: number | null = null;
  idReadonly: number | null = null;
  selectedPokemon?: Pokemon;
  filterText: string = '';
  show: boolean = false;

  pokemons: Pokemon[] = [];
  filteredPokemons: Pokemon[] = [];

  constructor(private pokeAPI: PokeAPI, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.pokeAPI.getPokemonList().subscribe({
      next: (data: any) => {
        this.pokemons = data.results.map((p: any, index: number) => ({
          id: index + 1,
          name: p.name.charAt(0).toUpperCase() + p.name.slice(1),
        }));
        console.log(this.pokemons);
      },
      error: (error) => {
        console.error('Error fetching Pokémon list:', error);
      },
    });
  }

  updateSelectedPokemon() {
    this.show = false;
    const id = Number(this.idReadonly);
    this.selectedPokemon = this.pokemons.find((p) => p.id === id);
    this.idSource = null;
  }

  searchById(arg0: number | null) {
    const idToSearch = Number(this.idSource ?? arg0);

    if (!idToSearch || isNaN(idToSearch)) return;

    this.idReadonly = idToSearch;
    this.idSource = null;

    // On appelle l'API et on met show à true dans le subscribe
    this.pokeAPI.getPokemonInfo(idToSearch).subscribe({
      next: (data: any) => {
        this.selectedPokemon = new Pokemon(
          data.id,
          data.name,
          data.height,
          data.weight,
          data.types.map((t: any) => t.type.name),
          data.sprites.front_default
        );
        console.log('Pokémon récupéré :', this.selectedPokemon);
        console.log(this.selectedPokemon, this.show = true);
        // ici show devient vrai dès que le Pokémon est récupéré
        this.show = true;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Erreur :', err);
        this.selectedPokemon = undefined;
        this.show = false;
        this.cdr.detectChanges();
      },
    });
  }

  filterPokemon(event: any) {
    const query = event.query.toLowerCase();
    this.filteredPokemons = this.pokemons.filter((p) => p.name.toLowerCase().includes(query));
  }
}
