pragma solidity ^0.4.24;

import "./Depository.sol";

contract Order {
    
        address depositoryAddress;
        Depository depositoryContract;
        mapping (bytes32 => Claim) orderList;
        
        struct Claim {
            bytes32 id;
            bytes32 assetId;
            bytes32 ownershipId;
            address owner;
            string intent;
            address broker;
            address issuer; // msg.sender
            bytes ownerSignature; // this.address + topic + data
            string data;
        }
        
        event OrderCreated(uint256 time, bytes32 orderId, bytes32 assetId, bytes32 ownershipId, address owner, string intent, address broker, string data, bytes ownerSignature);
        
        function createOrder(bytes32 _assetId, bytes32 _ownershipId, address _owner, string _intent, address _broker, string _data, bytes _ownerSignature) public {
            uint random_number = uint(blockhash(block.number-1))%10 + 1; 
            
            Claim memory ownerClaim;
            ownerClaim.assetId = _assetId;
            ownerClaim.ownershipId = _ownershipId;
            ownerClaim.owner = _owner;
            ownerClaim.intent = _intent;
            ownerClaim.broker = _broker;
            ownerClaim.issuer = msg.sender;
            ownerClaim.ownerSignature = _ownerSignature;
            ownerClaim.data = _data;
            ownerClaim.id = keccak256(uintToByte32(random_number));
            emit OrderCreated(now, ownerClaim.id, ownerClaim.assetId, ownerClaim.ownershipId, ownerClaim.owner, ownerClaim.intent, ownerClaim.broker, ownerClaim.data, ownerClaim.ownerSignature);
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