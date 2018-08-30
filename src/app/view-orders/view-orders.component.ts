import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order/order.service';
import { Web3Service } from '../util/web3.service';
import { DepositoryService } from '../services/depository/depository.service';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/timer';

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
  verifiedOrders: any;
  assetVerified: boolean;
  ownershipVerified: boolean;
  brokerVerified: boolean;
  intentVerified: boolean;
  matchVerified: boolean;
  private subscription: Subscription;
  private timer1: Observable<any>;
  private timer2: Observable<any>;
  private timer3: Observable<any>;
  private timer4: Observable<any>;
  private timer5: Observable<any>;


  constructor(web3Service: Web3Service, orderService: OrderService, depositoryService: DepositoryService) {
    this.web3Service = web3Service;
    this.orderService = orderService;
    this.depositoryService = depositoryService;
    this.orderEvents = null;
    this.getAllOrders();
    this.verifiedOrders = [];
    this.assetVerified = false;
    this.ownershipVerified = false;
    this.brokerVerified = false;
    this.intentVerified = false;
    this.matchVerified = false;
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
        this.verifiedOrders.push(order);
        this.verificationTimer();
        return true;
      }
      else {
        alert("Verification Failed");
      }
    })
  }

  async verificationTimer() {
    this.timer1 = Observable.timer(1000); // 1000 millisecond means 1 second
    this.subscription = this.timer1.subscribe(() => {
        // set assetVerified to true to show loading div to view after 1 second
        this.assetVerified = true;
    });
    this.timer2 = Observable.timer(2000); // 2000 millisecond means 2 seconds
    this.subscription = this.timer2.subscribe(() => {
        // set ownershipVerified to true to show loading div to view after 2 seconds
        this.ownershipVerified = true;
    });
    this.timer3 = Observable.timer(3000); // 3000 millisecond means 3 seconds
    this.subscription = this.timer3.subscribe(() => {
        // set brokerVerified to true to show loading div to view after 3 seconds
        this.brokerVerified = true;
    });
    this.timer4 = Observable.timer(4000); // 4000 millisecond means 4 seconds
    this.subscription = this.timer4.subscribe(() => {
        // set intentVerified to true to show loading div to view after 4 seconds
        this.intentVerified = true;
    });
    this.timer5 = Observable.timer(5000); // 5000 millisecond means 5 seconds
    this.subscription = this.timer5.subscribe(() => {
        // set matchVerified to true to show loading div to view after 5 seconds
        this.matchVerified = true;
    });
  }

  verified(_order) {
    for(var i=0; i<this.verifiedOrders.length; i++) {
      if(this.verifiedOrders[i].toString().toLowerCase() == _order.toString().toLowerCase()) {
        return true;
      }
    }
  }

}
