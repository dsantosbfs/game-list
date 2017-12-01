import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

/* Components */
import { AppComponent } from './components/app/app.component';
import { FilterComponent } from './components/filter/filter.component';
import { GameComponent } from './components/game/game.component';
import { GameListComponent } from './components/game-list/game-list.component';
import { GameListItemComponent } from './components/game-list-item/game-list-item.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { SearchComponent } from './components/search/search.component';

/* Pipes */
import { FilterPipe } from './pipes/filter.pipe';
import { OrderByPipe } from './pipes/orderby.pipe';

/* Routers */
import { AppRoutingModule } from './routers/app-routing.module';

/* Repositories */
import { GameRepository } from './repositories/game.repository';

/* Services */
import { GameService } from './services/game.service';

@NgModule({
  declarations: [
    AppComponent,
    FilterComponent,
    FilterPipe,
    GameComponent,
    GameListComponent,
    GameListItemComponent,
    NavBarComponent,
    OrderByPipe,
    SearchComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    InfiniteScrollModule,
  ],
  providers: [
    GameRepository,
    GameService,
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
