import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class PokeAPI {
  private apiUrl = 'https://pokeapi.co/api/v2/pokemon';
  constructor(private http: HttpClient) {}
  getPokemonList(): Observable<any> {
    return this.http.get(`${this.apiUrl}?limit=1500`);
  }

  getPokemonInfo(id: number | string, limit: number = 50, offset: number = 0): Observable<any> {
    if (id != null) {
      return this.http.get(`${this.apiUrl}/${id}`);
    } else {
      const url = `${this.apiUrl}?limit=${limit}&offset=${offset}`;
      return this.http.get(url);
    }
  }
}
