import { TestBed } from '@angular/core/testing';

import { PokeAPI } from './poke-api';

describe('PokeAPI', () => {
  let service: PokeAPI;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PokeAPI);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
