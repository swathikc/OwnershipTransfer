import { Component, OnInit } from '@angular/core';
import { AssetService } from '../../services/asset/asset.service';

@Component({
  selector: 'app-view-assets',
  templateUrl: './view-assets.component.html',
  styleUrls: ['./view-assets.component.css']
})
export class ViewAssetsComponent implements OnInit {

  assetEvents: any;
  assetService: AssetService;

  constructor(assetService: AssetService) {
    this.assetService = assetService;
    this.assetEvents = [];
    this.getAllAssets();
  }

  ngOnInit() {
    this.assetService.getAllAssetCreatedEvents();
  }

  getAllAssets() {
    this.assetEvents = this.assetService.assetEvents;
    console.log(this.assetEvents);
  }

  getDate(time) {
    time = new Date().getTime();
    var date = new Date(time);
     return date.toString().substring(0,25); // Wed Jan 12 2011 12:42:46 GMT-0800 (PST)
  }

  shortID(id) {
    return id.substring(0,15) + ".....";
  }

}
