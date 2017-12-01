import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  @Input() title: string;
  showBackButton = false;

  constructor(private router: Router) { }

  ngOnInit() {
    const currentUrl = this.router.url;

    if (currentUrl !== '/') {
      this.showBackButton = true;
    }
  }

  back() {
    window.history.back();
  }
}
