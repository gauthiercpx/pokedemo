import { ComponentFixture, TestBed } from '@angular/core/testing';
import { App } from './app';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { SearchId } from '../search-id/search-id';
import { FilterPokemonPipe } from '../pipes/filter-pokemon.pipe';

describe('App', () => {
  let component: App;
  let fixture: ComponentFixture<App>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(App);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'pokedemo'`, () => {
    expect(component.title()).toEqual('pokedemo');
  });

  it('should render the title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('pokedemo!');
  });

  it('should render the search-id component', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const searchIdElement = compiled.querySelector('app-search-id');
    expect(searchIdElement).toBeTruthy();
  });

  it('should render the router outlet', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const routerOutlet = compiled.querySelector('router-outlet');
    expect(routerOutlet).toBeTruthy();
  });

  it('should have a centered container', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const container = compiled.querySelector('div[style*="text-align: center"]');
    expect(container).toBeTruthy();
  });
});
