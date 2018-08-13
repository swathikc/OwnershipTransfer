import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-pending-matches',
  templateUrl: './view-pending-matches.component.html',
  styleUrls: ['./view-pending-matches.component.css']
})
export class ViewPendingMatchesComponent implements OnInit {

  showSign: Boolean;
  constructor() { 
    this.showSign = false
  }

  ngOnInit() {
  }

  sign() {
    this.showSign = true;
  }
}
