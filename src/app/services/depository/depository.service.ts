import { Injectable } from '@angular/core';
import { Web3Service } from '../../util/web3.service';

declare let require: any;
const depository_artifacts = require('../../../../build/contracts/Depository.json');

@Injectable()
export class DepositoryService {
  defaultAccount: any
  Depository: any
  newAsset: any;
  web3Service: Web3Service;
  assetEvents: any;
  depositoryContract: any;
  ownershipEvents: any;
  ownershipResult: any;

  constructor(web3Service: Web3Service) {
    console.log('Constructor web3Service: ' + web3Service);
    this.web3Service = web3Service;
    this.newAsset = {
      assetName: null,
      assetDescription: null,
      owner: null
    }
    this.web3Service.artifactsToContract(depository_artifacts)
      .then((DepositoryAbstraction) => {
        console.log("DepositoryAbstraction: " + DepositoryAbstraction);
        this.Depository = DepositoryAbstraction;
      });
    this.assetEvents = [];
    this.depositoryContract = [];
    this.ownershipEvents = [];

  }

  async createFirstOwnership(owner, assetId, assetAddress) {
    try {

      var account = this.web3Service.accounts[0];
      console.log(account)

      const deployedDepository = await this.Depository.deployed();
      const createOwnershipTransaction = await deployedDepository.createFirstOwnership.sendTransaction(owner, assetId, assetAddress, { from: account });

      if (createOwnershipTransaction) {
        alert("Create First Ownership Transaction Successful");
        console.log("createOwnershipTransaction: " + createOwnershipTransaction);
      } else {
        alert("Create First Ownership Transaction Failed");
      }
    } catch (e) {
      console.log(e);
    }
  }

  async createOwnership(owner, previousOwnershipId, assetId) {
    event.preventDefault();
    try {

      var account = this.web3Service.accounts[0];
      console.log(account)

      const deployedDepository = await this.Depository.deployed();
      const createOwnershipTransaction = await deployedDepository.createOwnership.sendTransaction(owner, previousOwnershipId, assetId, { from: account });

      if (createOwnershipTransaction) {
        alert("Create Ownership Transaction Successful");
        console.log("createOwnershipTransaction: " + createOwnershipTransaction);
      } else {
        alert("Create Ownership Transaction Failed");
      }
    } catch (e) {
      console.log(e);
    }
  }

  async getOwnershipById(ownershipId) {

    try {
      var account = this.web3Service.accounts[0];
      console.log(account)
      console.log("Inside Depository Service");

      const deployedDepository = await this.Depository.deployed();
      var ownershipResult = await deployedDepository.getOwnershipById.call(ownershipId);
      return ownershipResult;
    } catch (e) {
      console.log(e);
    }
  }

  async getDepositoryCreatedEvents() {
    const deployedDepository = await this.Depository.deployed();
    deployedDepository.DepositoryContractDeployed({}, { fromBlock: 0, toBlock: 'latest' }).get((error, eventResult) => {
      if (error)
        console.log('Error in AssetCreated event handler: ' + error);
      else {
        this.depositoryContract = eventResult;
      }
    });
  }

  async getOwnershipCreatedEvents() {
    const deployedDepository = await this.Depository.deployed();
    deployedDepository.OwnershipCreated({}, { fromBlock: 0, toBlock: 'latest' }).get((error, eventResult) => {
      if (error)
        console.log('Error in AssetCreated event handler: ' + error);
      else {
        this.ownershipEvents = eventResult;
        console.log("Ownership events: "+eventResult);
      }
    });
  }

}
