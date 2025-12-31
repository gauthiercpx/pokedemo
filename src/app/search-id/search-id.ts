import { Component, OnInit, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Pokemon, PokemonInformations } from '../models/pokemon.model';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { PokeAPI } from '../services/poke-api.service';
import { FilterPokemonPipe } from '../pipes/filter-pokemon.pipe';

@Component({
  selector: 'app-search-id',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    AutoCompleteModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatFormFieldModule,
    FilterPokemonPipe,
  ],
  templateUrl: './search-id.html',
  styleUrl: './search-id.css',
})
export class SearchId implements OnInit {
  private pokeAPI = inject(PokeAPI);
  private cdr = inject(ChangeDetectorRef);

  idSource: number | null = null;
  idReadonly: number | null = null;
  selectedPokemon?: Pokemon;
  pokemonInfo: PokemonInformations | null = null;
  filterText: string = '';
  show: boolean = false;

  pokemons: Pokemon[] = [];
  filteredPokemons: Pokemon[] = [];

  ngOnInit() {
    this.pokeAPI.getPokemonList().subscribe({
      next: (data: any) => {
        this.pokemons = data.results.map((p: any) => {
          const url: string = p.url || '';
          const m = url.match(/\/pokemon\/(\d+)\/?$/);
          const id = m ? Number(m[1]) : NaN;
          return {
            id: id,
            name: p.name,
          };
        });
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
    this.cdr.detectChanges();
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
          data.url,
        );
        this.pokemonInfo = data;
        console.log('Pokémon récupéré :', this.selectedPokemon);
        console.log('Infos Pokémon :', this.pokemonInfo);
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
