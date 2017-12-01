import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { GameService } from '../../services/game.service';
import { Game } from '../../interfaces/game';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  game: Game;
  notFound = false;

  constructor(
    private route: ActivatedRoute,
    private gameService: GameService,
    private location: Location
  ) { }

  ngOnInit() {
    this.getGame();
  }

  getGame(): void {
    const slug = this.route.snapshot.paramMap.get('slug');
    this.gameService.getGame(slug)
      .subscribe(game => {
        this.game = game;

        if (!this.game) {
          this.notFound = true;
        }
      });
  }
}
