import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Game } from '../interfaces/game';
import { GameRepository } from '../repositories/game.repository';

@Injectable()
export class GameService {
  private endPoint = 'https://api.twitch.tv/kraken/games/top';
  private clientID = 'oxhoac2rpuyrszh4pqyugrwcm6yh2x';
  private limit = 100;
  private offset = 0;
  private params;

  constructor(
    private http: HttpClient,
    private gameRepository: GameRepository
  ) {
    const userAgent = navigator.userAgent;

    if (userAgent.match(/Android|BlackBerry|iPhone|iPod|Opera Mini|IEMobile/i)) {
      this.limit = 25;
    } else if (userAgent.match(/iPad/i)) {
      this.limit = 50;
    } else {
      this.limit = 100;
    }
  }

  /*
  * Recupera do repositório de games um game pelo id
  *
  * @params slug:string : Slug do jogo
  * @return Game : Objeto do jogo
  */
  getGame(slug: string): Observable<Game> {
    return of(this.gameRepository.games.find(game => game.slug === slug));
  }

  /*
  * Dispara request para listagem dos jogos
  *
  * @return Game[] : Lista de jogos
  */
  getGames(): Observable<any> {
    this.params = new HttpParams();
    this.params = this.params.append('limit', this.limit);
    this.params = this.params.append('offset', this.offset);

    return this.request();
  }

  /*
  * Requisita a paginação de jogos ao Twitch
  *
  * @return Game[] : Lista de jogos
  */
  nextPage(): Observable<any> {
    this.offset += this.limit;
    this.params = new HttpParams();
    this.params = this.params.append('limit', this.limit);
    this.params = this.params.append('offset', this.offset);

    return this.request();
  }

  /*
  * Faz log do erro via console
  */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(operation, error);
      // Retorna um resultado vazio para garantir o funcionamento do app
      return of(result as T);
    };
  }

  /*
  * Executa as requisições para a api do Twitch
  *
  * @return Game[] : Lista de jogos
  */
  private request(): Observable<Game[]> {
    return this.http.get<Game[]>(this.endPoint, {
      headers: new HttpHeaders().set('Client-ID', this.clientID),
      params: this.params
    })
      .pipe(
        catchError(this.handleError('getGames', []))
      );
  }
}
