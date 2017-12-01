import { Component, OnInit } from '@angular/core';
import { GameService } from '../../services/game.service';
import { GameRepository } from '../../repositories/game.repository';
import { Game } from '../../interfaces/game';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss']
})
export class GameListComponent implements OnInit {
  games: Game[];
  query: string;
  title = 'Game List';
  filters: Array<object> = [
    { label: 'Nome', value: 'name' },
    { label: 'Popularidade', value: '-popularity' },
    { label: 'Visualizações', value: '-viewers' }
  ];
  orderBy: string;
  scrollCallback: any;
  showSplashScreen = false;
  showListLoader = false;

  constructor(
    private gameService: GameService,
    private gameRepository: GameRepository
  ) {
    this.scrollCallback = this.paginate.bind(this);
  }

  ngOnInit() {
    this.getGames();
  }

  /*
  * Requisita a lista de jogos
  */
  getGames(): void {
    if (this.gameRepository.games.length > 0) {
      this.games = this.gameRepository.getGames();

      return;
    }

    this.showSplashScreen = true;

    this.gameService.getGames()
      .subscribe(
        games => {
          this.gameRepository.addGames(games);
          this.games = this.gameRepository.getGames();
          this.showSplashScreen = false;
        }
      );
  }

  /*
  * Reseta o scroll para 0
  */
  goTop() {
    window.scrollTo(0, 0);
  }

  /*
  * Callback do evento de busca
  *
  * @params query:string : String da busca
  */
  searchGames(query: string): void {
    this.query = query;
  }

  /*
  * Callback do evento de filtro
  *
  * @params filter:string : String do filtro
  */
  filterGames(filter: string): void {
    this.orderBy = filter;
  }

  /*
  * Callback da paginação
  */
  paginate() {
    if (this.gameRepository.games.length === this.gameRepository.totalGames) {
      return;
    }

    this.showListLoader = true;

    return this.gameService.nextPage().subscribe(games => {
      this.gameRepository.addGames(games);
      this.games = this.gameRepository.getGames();
      this.showListLoader = false;
    });
  }

}
