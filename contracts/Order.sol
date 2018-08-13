pragma solidity ^0.4.24;

import "./Depository.sol";

contract Order {
    
        address depositoryAddress;
        Depository depositoryContract;
        mapping (bytes32 => Claim) orderList;
        
        struct Claim {
            bytes32 id;
            bytes32 assetId;
            address owner;
            string intent;
            address broker;
            address issuer; // msg.sender
            bytes ownerSignature; // this.address + topic + data
            string data;
        }
        
        event OrderCreated(uint256 time, bytes32 orderId, bytes32 assetId, string intent, address broker, bytes ownerSignature, string data, address depositoryAddress);
        
        function createOrder(bytes32 _assetId, string _intent, address _broker, bytes _ownerSignature, string _data, address _depositoryAddress) public {
            depositoryAddress = _depositoryAddress;
            depositoryContract = Depository(depositoryAddress);
            uint random_number = uint(blockhash(block.number-1))%10 + 1; 
            
            Claim memory ownerClaim;
            ownerClaim.assetId = _assetId;
            ownerClaim.owner = depositoryContract.getOwnerById(_assetId);
            ownerClaim.intent = _intent;
            ownerClaim.broker = _broker;
            ownerClaim.issuer = msg.sender;
            ownerClaim.ownerSignature = _ownerSignature;
            ownerClaim.data = _data;
            ownerClaim.id = keccak256(uintToByte32(random_number));
            emit OrderCreated(now, ownerClaim.id, ownerClaim.assetId, ownerClaim.intent, ownerClaim.broker, ownerClaim.ownerSignature, ownerClaim.data, depositoryAddress);
        }
        
        function getOrderById(bytes32 order_id) public view returns(bytes32 orderId, bytes32 assetId, address owner, string intent, address broker, address issuer, bytes ownerSignature, string data) {
            Claim memory claim;
            claim = orderList[order_id];
            orderId = claim.id;
            assetId = claim.assetId;
            owner = claim.owner;
            intent = claim.intent;
            broker = claim.broker;
            issuer = claim.issuer;
            ownerSignature = claim.ownerSignature;
            data = claim.data;
        }
        
        
        
        function uintToByte32(uint256 x) internal pure returns (bytes b) {
        b = new bytes(32);
        assembly { mstore(add(b, 32), x) }
    }
        
}