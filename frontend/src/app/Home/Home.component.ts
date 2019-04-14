import { Component, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-Home',
  templateUrl: './Home.component.html',
  styleUrls: ['./Home.component.scss']
})
export class HomeComponent implements OnInit {
  pageTitle: string;
  constructor() {
    this.pageTitle = 'Home';
  }

  ngOnInit() {
    console.log(this.pageTitle);
  }

}
