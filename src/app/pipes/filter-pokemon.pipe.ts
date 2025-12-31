import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterPokemonPipe',
  standalone: true,
})
export class FilterPokemonPipe implements PipeTransform {
  transform(pokemons: any[], property?: string, searchString?: string): any {
    if (!searchString) {
      return pokemons;
    } else if (pokemons && property) {
      return pokemons.filter((pokemon) => {
        return pokemon[property].toLowerCase().includes(searchString.toLowerCase());
      });
    } else {
      return [];
    }
  }
}
