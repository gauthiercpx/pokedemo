import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { PokeAPI } from './poke-api.service';

describe('PokeAPI', () => {
  let service: PokeAPI;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PokeAPI,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(PokeAPI);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have httpClient injected', () => {
    expect(service['http']).toBeTruthy();
  });

  it('should have apiUrl property set correctly', () => {
    const apiUrl = service['apiUrl'];
    expect(apiUrl).toBe('https://pokeapi.co/api/v2/pokemon');
  });

  it('should get pokemon list', () => {
    const mockData = {
      results: [
        { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
        { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' }
      ]
    };

    service.getPokemonList().subscribe(data => {
      expect(data.results.length).toBe(2);
      expect(data.results[0].name).toBe('bulbasaur');
    });

    const req = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon?limit=1500');
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('should get pokemon info by id', () => {
    const mockPokemonInfo = {
      id: 1,
      name: 'bulbasaur',
      height: 7,
      weight: 69
    };

    service.getPokemonInfo(1).subscribe(data => {
      expect(data.id).toBe(1);
      expect(data.name).toBe('bulbasaur');
    });

    const req = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon/1');
    expect(req.request.method).toBe('GET');
    req.flush(mockPokemonInfo);
  });

  it('should get pokemon info by string id', () => {
    const mockPokemonInfo = {
      id: 25,
      name: 'pikachu'
    };

    service.getPokemonInfo('pikachu').subscribe(data => {
      expect(data.name).toBe('pikachu');
    });

    const req = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon/pikachu');
    expect(req.request.method).toBe('GET');
    req.flush(mockPokemonInfo);
  });

  it('should get pokemon info with null id using limit and offset', () => {
    const mockData = {
      results: [
        { name: 'pokemon1', url: 'url1' },
        { name: 'pokemon2', url: 'url2' }
      ]
    };

    service.getPokemonInfo(null as any, 2, 5).subscribe(data => {
      expect(data.results.length).toBe(2);
    });

    const req = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon?limit=2&offset=5');
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('should handle getPokemonInfo with limit and offset', () => {
    const mockData = {
      results: [
        { name: 'pokemon1', url: 'url1' },
        { name: 'pokemon2', url: 'url2' }
      ]
    };

    service.getPokemonInfo(null as any, 2, 10).subscribe(data => {
      expect(data.results.length).toBe(2);
    });

    const req = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon?limit=2&offset=10');
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });
});
