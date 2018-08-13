pragma solidity ^0.4.24;

import "./Depository.sol";

contract Match {
    address assetContract;
    string assetAmount;
    address seller;
    address buyer;
    address oldOwner;
    address newOwner;
    string sellerSignature;
    string buyerSignature;
    string depositorySignature;
    address sellOrderContract;
    address buyOrderContract;
    address depositoryContract;
    address depository;
    Depository depo;
    
    
    event MatchContractDeployed(uint256 time, address matchContract, address assetContract, string assetAmount, address seller, address buyer, address oldOwner, address newOwner,
    address sellOrderContract, address buyOrderContract, address depository);
    event SellerSignatureUpdated(uint256 time, address matchContract, string sellerSignature);
    event BuyerSignatureUpdated(uint256 time, address matchContract, string buyerSignature);
    event DepositorySignatureUpdated(uint256 time, address matchContract, string depositorySignature);
    
    function matchCreated(address _assetContract, string _assetAmount, address _seller, address _buyer, address _oldOwner, address _newOwner,
    address _sellOrderContract, address _buyOrderContract) public {
        assetContract = _assetContract;
        assetAmount = _assetAmount;
        seller = _seller;
        buyer = _buyer;
        oldOwner = _oldOwner;
        newOwner = _newOwner;
        sellOrderContract = _sellOrderContract;
        buyOrderContract = _buyOrderContract;
        depo = Depository(depositoryContract);
        depository = depo.getEmployee();
        emit MatchContractDeployed(now, this, assetContract, assetAmount, seller, buyer, oldOwner, newOwner, sellOrderContract, buyOrderContract, depository);
    }
    
    function updateSellerSignature(string _sellerSignature) onlySeller public {
        sellerSignature = _sellerSignature;
        emit SellerSignatureUpdated(now, this, sellerSignature);
    }
    
    function updateBuyerSignature(string _buyerSignature) onlySeller public {
        buyerSignature = _buyerSignature;
        emit BuyerSignatureUpdated(now, this, buyerSignature);
    }
    
    function updateDepositorySignature(string _depositorySignature) onlySeller public {
        depositorySignature = _depositorySignature;
        emit DepositorySignatureUpdated(now, this, depositorySignature);
    }
    
    modifier onlyBuyer() {
        require(
            (msg.sender == buyer) 
        );
        _;
    }
    
    modifier onlySeller() {
        require(
            (msg.sender == seller) 
        );
        _;
    }
    
    modifier onlyDepository() {
        require(
            (msg.sender == depository) 
        );
        _;
    }
}