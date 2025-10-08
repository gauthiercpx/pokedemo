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
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';
import { provideHttpClient } from '@angular/common/http';

@NgModule({
  declarations: [App, SearchId, FilterPokemonPipePipe],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserModule,
    AutoCompleteModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideHttpClient()
  ],
  bootstrap: [App],
})
export class AppModule {}
