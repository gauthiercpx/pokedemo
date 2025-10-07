import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class PokeAPI {
  private apiUrl = 'https://pokeapi.co/api/v2/pokemon';
  constructor(private http: HttpClient) {}
  getPokemonById(id?: number, limit: number = 20, offset: number=0): Observable<any> {
    if (id != null) {
    return this.http.get(`${this.apiUrl}/${id}`);
  } else {
    const url = `${this.apiUrl}?limit=${limit}&offset=${offset}`;
    return this.http.get(url);
  }
  }
  getPokemonByName(name: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${name}`);
  }
}
