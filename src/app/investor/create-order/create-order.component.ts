import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order/order.service';
import { DepositoryService } from '../../services/depository/depository.service';
import { AssetService } from '../../services/asset/asset.service';
import { Web3Service } from '../../util/web3.service';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.css']
})
export class CreateOrderComponent implements OnInit {
  web3Service: Web3Service;
  orderService: OrderService;
  depositoryService: DepositoryService;
  assetService: AssetService;
  assetEvents: any;
  orderEvents: any;
  ownershipEvents: any;
  owner: any;
  ownersAsset: any;
  depositoryContract: any;
  newOrder: any;
  privateKey: any;

  constructor(orderService: OrderService, depositoryService: DepositoryService, assetService: AssetService, web3Service: Web3Service) {
    this.web3Service = web3Service;
    this.orderService = orderService;
    this.depositoryService = depositoryService;
    this.assetService = assetService;
    this.assetEvents = null;
    this.orderEvents = null;
    this.ownershipEvents = null;
    this.depositoryContract = null;
    this.privateKey = null;
    this.newOrder = {
      owner: null,
      assetId: null,
      depositoryAddress: null,
      intent: null,
      broker: null,
      data: null,
      ownerSignature: null
    }
  }

  ngOnInit() {
    this.depositoryContract = this.depositoryService.depositoryContract;
    this.assetEvents = this.assetService.assetEvents;
    this.ownershipEvents = this.depositoryService.ownershipEvents;
    this.privateKey = this.orderService.privateKey;
    this.orderEvents = this.orderService.orderEvents;
  }

  selectedOwner(value: any) {
    if (value == "") {
      alert("Please select a owner")
    }
    else {
      this.owner = value;
      this.ownersAsset = this.getAssetsOfOwner(this.owner);
    }
  }

  getAssetsOfOwner(owner) {
    var assets = [];
    for (var ownership of this.depositoryService.ownershipEvents) {
      if (ownership.args.owner == owner) {
        assets.push(ownership.args.assetId);
      }
    }
    return assets;
  }

  getOwnerships() {
  }

  createOrder(event, createOrderForm) {
    event.preventDefault();
    if (!createOrderForm.valid) {
      alert('Invalid Data!');
      return;
    }
    console.log(this.newOrder);
    var owner = this.newOrder.owner;
    var assetId = this.newOrder.assetId;
    var depositoryAddress = this.newOrder.depositoryAddress;
    var intent = this.newOrder.intent;
    var broker = this.newOrder.broker;
    var data = this.newOrder.data;
    console.log("Sign: "+JSON.stringify(this.web3Service.sign(data, this.privateKey)));
    var ownerSignature = this.web3Service.sign(data, this.privateKey);

    this.orderService.createOrder(assetId, intent, broker, data, ownerSignature.signature, depositoryAddress);

  }

  getAllOrderEvents() {
    this.orderService.getAllOrderCreatedEvents();
    this.orderEvents = this.orderService.orderEvents;
    console.log("Order events: "+this.orderEvents);
  }

}
