import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  intervalToSearch;
  @Output() searchCallback = new EventEmitter<string>();

  constructor() { }

  ngOnInit() { }

  /*
  * Callback do evento de keyup no campo de busca
  *
  * @params $event : Dados do Evento
  */
  search($event) {
    const query = $event.target.value;
    const self = this;

    // Impede o disparo de multiplos requests
    clearTimeout(this.intervalToSearch);
    this.intervalToSearch = setTimeout(() => {
      self.searchCallback.next(query);
    }, 300);
  }
}
