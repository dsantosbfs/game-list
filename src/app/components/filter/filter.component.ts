import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  @Input() filters: object;
  @Output() filterCallback = new EventEmitter<string>();
  isActive: string;

  constructor() { }

  ngOnInit() { }

  /*
  * Callback do evento de filtro
  *
  * @params filter:string : String do filtro
  */
  filterData(filter: string) {
    this.isActive = filter;
    this.filterCallback.next(filter);
  }

}
