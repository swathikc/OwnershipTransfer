import { Injectable } from '@angular/core';
import { Web3Service } from '../../util/web3.service';

declare let require: any;
const order_artifacts = require('../../../../build/contracts/Order.json');


@Injectable()
export class OrderService {
  defaultAccount: any
  Order: any
  newOrder: any;
  web3Service: Web3Service;
  orderEvents: any;

  constructor(web3Service: Web3Service) { 
    console.log('Constructor web3Service: ' + web3Service);
    this.web3Service = web3Service;
    this.newOrder = {
      assetId: null,
      intent: null,
      broker: null,
      data: null,
      ownerSignature: null,
      depositoryContractAddress: null
    }
    this.web3Service.artifactsToContract(order_artifacts)
      .then((OrderAbstraction) => {
        console.log("OrderAbstraction: " + OrderAbstraction);
        this.Order = OrderAbstraction;
      });
    this.orderEvents = [];
  }

  async createOrder(assetId, intent, broker, data, ownerSignature, depositoryContractAddress) {

    try {
      var account = this.web3Service.accounts[0];
      console.log(account)
      console.log("Inside Order Service");

      const orderDepository = await this.Order.deployed();
      const createOrderTransaction = await orderDepository.createOrder.sendTransaction(assetId, intent, broker, data, ownerSignature, { from: account });

      if (createOrderTransaction) {
        alert("Create Order Transaction Successful");
        console.log("createOrderTransaction: " + createOrderTransaction);
      } else {
        alert("Create Order Transaction Failed");
      }
    } catch (e) {
      console.log(e);
    }
  }

  async getOrderById(orderId) {
    try {
      var account = this.web3Service.accounts[0];
      console.log(account)
      console.log("Inside Order Service");

      const orderDepository = await this.Order.deployed();
      const getOrderTransaction = await orderDepository.createOrder.getOrderById(orderId, { from: account });

      if (getOrderTransaction) {
        alert("Get Order Transaction Successful");
        console.log("getOrderTransaction: " + getOrderTransaction);
      } else {
        alert("Get Order Transaction Failed");
      }
    } catch (e) {
      console.log(e);
    }
  }

}
