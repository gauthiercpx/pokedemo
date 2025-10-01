import {
  NgModule,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { SearchId } from './search-id/search-id';
import { FilterPokemonPipePipe } from './filter-pokemon--pipe-pipe';
import { AutoCompleteModule } from 'primeng/autocomplete';


@NgModule({
  declarations: [App, SearchId, FilterPokemonPipePipe],
  imports: [BrowserModule, AppRoutingModule, FormsModule, BrowserModule, AutoCompleteModule],
  providers: [provideBrowserGlobalErrorListeners(), provideZonelessChangeDetection()],
  bootstrap: [App],
})
export class AppModule {}
