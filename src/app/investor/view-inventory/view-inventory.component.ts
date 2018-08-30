import { Component, OnInit } from '@angular/core';
import { AssetService } from '../../services/asset/asset.service';

@Component({
  selector: 'app-view-inventory',
  templateUrl: './view-inventory.component.html',
  styleUrls: ['./view-inventory.component.css']
})
export class ViewInventoryComponent implements OnInit {

  assetService: AssetService;
  assetEvents: any;
  ownerAssetList: any;
  owner: any;

  constructor(assetService: AssetService) {
    this.assetService = assetService;
    this.ownerAssetList = [];
   }

  ngOnInit() {
    this.assetEvents = this.assetService.assetEvents;
  }

  getAssets(owner) {
    console.log("Inside inventory get assets")
    for(var i=0; i<this.assetEvents.length; i++) {
      console.log(this.assetEvents[i]);
      var asset = this.assetEvents[i];
      if(asset.args.owner == owner.toLowerCase()) {
        console.log("Asset: "+asset);
        this.ownerAssetList.push(asset);
      }
    }
    console.log(this.ownerAssetList);
  }

}
