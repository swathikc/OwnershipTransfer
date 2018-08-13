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

}
