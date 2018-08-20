import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order/order.service';
import { Web3Service } from '../util/web3.service';
import { DepositoryService } from '../services/depository/depository.service';

@Component({
  selector: 'app-view-orders',
  templateUrl: './view-orders.component.html',
  styleUrls: ['./view-orders.component.css']
})
export class ViewOrdersComponent implements OnInit {

  web3Service: Web3Service;
  orderService: OrderService;
  depositoryService: DepositoryService;
  orderEvents: any;
  ownership: any;
  validOrder: boolean;
  verifiedOrders: any;

  constructor(web3Service: Web3Service, orderService: OrderService, depositoryService: DepositoryService) {
    this.web3Service = web3Service;
    this.orderService = orderService;
    this.depositoryService = depositoryService;
    this.orderEvents = null;
    this.validOrder = false;
    this.getAllOrders();
    this.verifiedOrders = [];
    this.ownership = {
      ownershipId: null,
      assetId: null,
      previousOwnershipId: null,
      owner: null,
      depository: null
    }
   }

  ngOnInit() {
    this.orderService.getAllOrderCreatedEvents();
  }

  getAllOrders() {
    this.orderEvents = this.orderService.orderEvents;
    console.log(this.orderEvents);
  } 

  verifyOrder(order) {
    var ownershipId = order.args.ownershipId;
    var assetId = order.args.assetId;
    var owner = order.args.owner;
    var intent = order.args.intent;
    var broker = order.args.broker;
    var data = order.args.data;
    var ownerSignature = order.args.ownerSignature;

    const publicKey = this.web3Service.verifySignature(data, ownerSignature);
    console.log("PK: "+publicKey.toLowerCase());
    console.log("Owner: "+owner);
    this.depositoryService.getOwnershipById(ownershipId).then(ownership => {
      console.log("Ownership: " + ownership);
      var ownershipAfterSplit = ownership.toString().split(",");
      console.log("ownershipAfterSplit: " + ownershipAfterSplit);
      var ownershipId = ownershipAfterSplit[0];
      var owner = ownershipAfterSplit[1];
      var previousOwnershipId = ownershipAfterSplit[2];
      var asset_Id = ownershipAfterSplit[3];
      var depository = ownershipAfterSplit[4];
      this.ownership.ownershipId = ownershipId;
      this.ownership.owner = owner;
      this.ownership.previousOwnershipId = previousOwnershipId;
      this.ownership.assetId = asset_Id;
      this.ownership.depository = depository;
      console.log("assetId: "+assetId);
      console.log("this.ownership.assetId: "+this.ownership.assetId)
      if(assetId == this.ownership.assetId && owner == this.ownership.owner && owner == publicKey.toLowerCase()) {
        this.validOrder = true;
        alert("Valid");
        this.verifiedOrders.push(order);
        return true;
      }
    })
  }

  verified(_order) {
    for(let order in this.verifiedOrders) {
      if(order == _order) {
        return true;
      }
    }
  }

}
