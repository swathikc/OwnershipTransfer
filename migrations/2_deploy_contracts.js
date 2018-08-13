// var ConvertLib = artifacts.require("./ConvertLib.sol");
// var MetaCoin = artifacts.require("./MetaCoin.sol");
var Depository = artifacts.require("./Depository.sol");
var Order = artifacts.require("./Order.sol");
var Match = artifacts.require("./Match.sol");
var Asset = artifacts.require("./Asset.sol");

module.exports = function(deployer) {
  deployer.deploy(Depository, "MyDepository");
  deployer.link(Depository, Asset);
  deployer.deploy(Asset);
  deployer.link(Asset, Depository);
  deployer.link(Depository, Order);
  deployer.deploy(Order);
  deployer.deploy(Match);
};


