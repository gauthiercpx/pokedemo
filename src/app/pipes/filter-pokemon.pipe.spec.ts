import { FilterPokemonPipe } from './filter-pokemon.pipe';

describe('FilterPokemonPipe', () => {
  const pipe = new FilterPokemonPipe();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return all pokemons when searchString is empty', () => {
    const pokemons = [
      { id: 1, name: 'bulbasaur' },
      { id: 2, name: 'ivysaur' },
      { id: 3, name: 'venusaur' }
    ];

    const result = pipe.transform(pokemons, 'name', '');
    expect(result).toEqual(pokemons);
  });

  it('should filter pokemons by name property', () => {
    const pokemons = [
      { id: 1, name: 'bulbasaur' },
      { id: 2, name: 'ivysaur' },
      { id: 3, name: 'venusaur' },
      { id: 4, name: 'charmander' }
    ];

    const result = pipe.transform(pokemons, 'name', 'bul');
    expect(result.length).toBe(1);
    expect(result[0].name).toBe('bulbasaur');
  });

  it('should be case insensitive when filtering', () => {
    const pokemons = [
      { id: 1, name: 'Bulbasaur' },
      { id: 2, name: 'IVYSAUR' },
      { id: 3, name: 'venusaur' }
    ];

    const result = pipe.transform(pokemons, 'name', 'BUL');
    expect(result.length).toBe(1);
    expect(result[0].name).toBe('Bulbasaur');
  });

  it('should return empty array when no match found', () => {
    const pokemons = [
      { id: 1, name: 'bulbasaur' },
      { id: 2, name: 'ivysaur' }
    ];

    const result = pipe.transform(pokemons, 'name', 'pikachu');
    expect(result.length).toBe(0);
  });

  it('should return empty array when property is not provided', () => {
    const pokemons = [
      { id: 1, name: 'bulbasaur' },
      { id: 2, name: 'ivysaur' }
    ];

    const result = pipe.transform(pokemons, '', 'bul');
    expect(result.length).toBe(0);
  });
});
