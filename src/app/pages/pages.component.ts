import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

declare function customInitFunctions();

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {

  constructor( ) { }

  ngOnInit(): void {
    // customInitFunctions();
  }

}
