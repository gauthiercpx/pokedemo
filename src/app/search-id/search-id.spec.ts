import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { SearchId } from './search-id';

describe('SearchId', () => {
  let component: SearchId;
  let fixture: ComponentFixture<SearchId>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchId],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    })
    .compileComponents();

    httpMock = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(SearchId);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load pokemon list on init', () => {
    const mockPokemons = {
      results: [
        { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
        { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
        { name: 'venusaur', url: 'https://pokeapi.co/api/v2/pokemon/3/' }
      ]
    };

    fixture.detectChanges();

    const req = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon?limit=1500');
    expect(req.request.method).toBe('GET');
    req.flush(mockPokemons);

    expect(component.pokemons.length).toBe(3);
    expect(component.pokemons[0].name).toBe('bulbasaur');
    expect(component.pokemons[0].id).toBe(1);
  });

  it('should handle pokemon with invalid url format', () => {
    const mockPokemons = {
      results: [
        { name: 'unknown', url: 'invalid-url' },
        { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' }
      ]
    };

    fixture.detectChanges();

    const req = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon?limit=1500');
    req.flush(mockPokemons);

    expect(component.pokemons.length).toBe(2);
    expect(isNaN(component.pokemons[0].id)).toBe(true);
    expect(component.pokemons[1].id).toBe(1);
  });

  it('should fetch pokemon info by id', () => {
    const mockPokemonInfo = {
      id: 1,
      name: 'bulbasaur',
      url: 'https://pokeapi.co/api/v2/pokemon/1/'
    };

    component.searchById(1);

    const req = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon/1');
    expect(req.request.method).toBe('GET');
    req.flush(mockPokemonInfo);

    expect(component.selectedPokemon?.name).toBe('bulbasaur');
    expect(component.selectedPokemon?.id).toBe(1);
    expect(component.show).toBe(true);
  });

  it('should filter pokemons by search text', () => {
    component.pokemons = [
      { id: 1, name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
      { id: 4, name: 'charmander', url: 'https://pokeapi.co/api/v2/pokemon/4/' },
      { id: 7, name: 'squirtle', url: 'https://pokeapi.co/api/v2/pokemon/7/' }
    ];

    component.filterPokemon({ query: 'bul' });

    expect(component.filteredPokemons.length).toBe(1);
    expect(component.filteredPokemons[0].name).toBe('bulbasaur');
  });

  it('should call updateSelectedPokemon when searchById is called', () => {
    const mockPokemonInfo = {
      id: 1,
      name: 'bulbasaur',
      url: 'https://pokeapi.co/api/v2/pokemon/1/'
    };

    component.pokemons = [
      { id: 1, name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
      { id: 2, name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' }
    ];

    component.searchById(1);

    const req = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon/1');
    req.flush(mockPokemonInfo);

    expect(component.idReadonly).toBe(1);
  });

  it('should handle error when fetching pokemon info fails', () => {
    const error = new Error('Network error');

    component.searchById(999);

    const req = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon/999');
    req.error(new ErrorEvent('Network error'));

    expect(component.selectedPokemon).toBeUndefined();
    expect(component.show).toBe(false);
  });

  it('should not call API if idSource is null or invalid', () => {
    component.idSource = null;

    component.searchById(null);

    httpMock.expectNone('https://pokeapi.co/api/v2/pokemon/null');
  });

  it('should update selected pokemon when idReadonly is set and found in list', () => {
    component.pokemons = [
      { id: 1, name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
      { id: 2, name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' }
    ];
    component.idReadonly = 2;

    component.updateSelectedPokemon();

    expect(component.selectedPokemon?.name).toBe('ivysaur');
    expect(component.show).toBe(false);
  });

  it('should not update selected pokemon when not found in list', () => {
    component.pokemons = [
      { id: 1, name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
      { id: 2, name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' }
    ];
    component.idReadonly = 999;

    component.updateSelectedPokemon();

    expect(component.selectedPokemon).toBeUndefined();
    expect(component.idSource).toBeNull();
  });

  it('should handle error when pokemon list loading fails', () => {
    const error = new Error('Failed to fetch');

    fixture.detectChanges();

    const req = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon?limit=1500');
    req.error(new ErrorEvent('Network error'));

    expect(component.pokemons.length).toBe(0);
  });
});
