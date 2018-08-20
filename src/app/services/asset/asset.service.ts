import { Injectable } from '@angular/core';
import { Web3Service } from '../../util/web3.service';

declare let require: any;
const asset_artifacts = require('../../../../build/contracts/Asset.json');

@Injectable()
export class AssetService {
  defaultAccount: any
  Asset: any
  newAsset: any;
  web3Service: Web3Service;
  assetEvents: any;
  ownershipUpdatedEvents: any;
  assetContract: any;

  constructor(web3Service: Web3Service) {
    console.log('Constructor web3Service: ' + web3Service);
    this.web3Service = web3Service;
    this.newAsset = {
      assetName: null,
      assetDescription: null,
      depositoryAddress: null
    }
    this.web3Service.artifactsToContract(asset_artifacts)
      .then((AssetAbstraction) => {
        console.log("AssetAbstraction: " + AssetAbstraction);
        this.Asset = AssetAbstraction;
      });
    this.assetEvents = [];

  }

  async createAsset(assetName, assetDescription, depositoryAddress) {

    try {
      var account = this.web3Service.accounts[0];
      console.log(account)
      console.log("Inside Asset Service");

      const deployedAsset = await this.Asset.deployed();
      const createAssetTransaction = await deployedAsset.createAsset.sendTransaction(assetName, assetDescription, depositoryAddress, { from: account });

      if (createAssetTransaction) {
        alert("Create Asset Transaction Successful");
        console.log("createAssetTransaction: " + createAssetTransaction);
      } else {
        alert("Create Asset Transaction Failed");
      }
    } catch (e) {
      console.log(e);
    }
  }

  async getAssetById(assetId) {

    try {
      var account = this.web3Service.accounts[0];
      console.log(account)
      console.log("Inside Asset Service");

      const deployedAsset = await this.Asset.deployed();
      var assetResult = await deployedAsset.getAssetById.call(assetId);

      return assetResult;
    } catch (e) {
      console.log(e);
    }
  }

  async getAllAssetCreatedEvents() {
    const deployedAsset = await this.Asset.deployed();
    console.log("Inside getAllAssetCreatedEvents()")
    deployedAsset.AssetCreated({}, { fromBlock: 0, toBlock: 'latest' }).get((error, eventResult) => {
      if (error)
        console.log('Error in AssetCreated event handler: ' + error);
      else {
        console.log(eventResult);
        this.assetEvents = eventResult;
      }
    });
  }

  async getOwnershipUpdatedEvents() {
    const deployedAsset = await this.Asset.deployed();
    console.log("Inside getAllAssetCreatedEvents()")
    deployedAsset.OwnershipUpdated({}, { fromBlock: 0, toBlock: 'latest' }).get((error, eventResult) => {
      if (error)
        console.log('Error in AssetCreated event handler: ' + error);
      else {
        console.log(eventResult);
        this.ownershipUpdatedEvents = eventResult;
      }
    });
  }

}
