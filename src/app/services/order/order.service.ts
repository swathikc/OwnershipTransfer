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
  privateKey: any;

  constructor(web3Service: Web3Service) { 
    console.log('Constructor web3Service: ' + web3Service);
    this.web3Service = web3Service;
    this.privateKey = "0x5ccdaffada2560dc53c855252681266c364ae8beeaae0df9816155f33d43b0b9";
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

      const deployedOrder = await this.Order.deployed();
      const createOrderTransaction = await deployedOrder.createOrder.sendTransaction(assetId, intent, broker, ownerSignature, data, depositoryContractAddress , { from: account });

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

  async getAllOrderCreatedEvents() {
    const deployedOrder = await this.Order.deployed();
    console.log("Inside getAllAssetCreatedEvents()")
    deployedOrder.OrderCreated({}, { fromBlock: 0, toBlock: 'latest' }).get((error, eventResult) => {
      if (error)
        console.log('Error in AssetCreated event handler: ' + error);
      else {
        console.log(eventResult);
        this.orderEvents = eventResult;
      }
    });
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
