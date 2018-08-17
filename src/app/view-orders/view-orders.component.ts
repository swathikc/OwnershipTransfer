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
  validOrder: boolean;

  constructor(web3Service: Web3Service, orderService: OrderService, depositoryService: DepositoryService) {
    this.web3Service = web3Service;
    this.orderService = orderService;
    this.depositoryService = depositoryService;
    this.orderEvents = null;
    this.validOrder = false;
    this.getAllOrders();
   }

  ngOnInit() {
    this.orderService.getAllOrderCreatedEvents();
  }

  getAllOrders() {
    this.orderEvents = this.orderService.orderEvents;
    console.log(this.orderEvents);
  } 

  verifyOrder(order) {
    var orderId = order.args.orderId;
    var assetId = order.args.assetId;
    var owner = order.args.owner;
    var intent = order.args.intent;
    var broker = order.args.broker;
    var data = order.args.data;
    var ownerSignature = order.args.ownerSignature;

    const publicKey = this.web3Service.verifySignature(data, ownerSignature);
    console.log("PK: "+publicKey.toLowerCase());
    console.log("Owner: "+owner);
    if(owner == publicKey.toLowerCase()) {
      alert("Valid");
    }
  }

}
