import { Pokemon } from './pokemon.model';

describe('Pokemon', () => {
  it('should create an instance', () => {
    expect(new Pokemon(1, 'Bulbasaur', 'https://pokeapi.co/api/v2/pokemon/1/')).toBeTruthy();
  });
});
