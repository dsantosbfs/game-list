import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameListComponent } from '../components/game-list/game-list.component';
import { GameComponent } from '../components/game/game.component';

const routes: Routes = [
  { path: '', component: GameListComponent }, // Rota para lista de jogos
  { path: 'game/:slug', component: GameComponent } // Rota para tela de detalhes de um jogo
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
