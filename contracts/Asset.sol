pragma solidity ^0.4.0;

contract Asset {
    
    struct AssetObject {
        bytes32 id;
        string name;
        string desc;
        bytes32 ownershipId;
        address depositoryAddress;
        string depositorySignature;
    }
    mapping (bytes32 => AssetObject) assetList;
    
    
    event AssetCreated(uint256 time, bytes32 id, string name, string desc, address depositoryAddress);
    event OwnershipUpdated(uint256 time, bytes32 assetId, bytes32 ownershipId);
    
    function createAsset(string _name, string _desc, address _depositoryAddress) public payable {
        AssetObject memory asset;
        asset.name = _name;
        asset.desc = _desc;
        uint random_number = uint(blockhash(block.number-1))%10 + 1;
        asset.id = keccak256(uintToByte32(random_number));
        asset.depositoryAddress = _depositoryAddress;
        assetList[asset.id] = asset;
        emit AssetCreated(now, asset.id, asset.name, asset.desc, asset.depositoryAddress);
    }
    
    function uintToByte32(uint256 x) internal pure returns (bytes b) {
        b = new bytes(32);
        assembly { mstore(add(b, 32), x) }
    }
    
    function getAssetById(bytes32 assetId) public view returns(bytes32, string, string, bytes32, address) {
        AssetObject memory asset;
        asset = assetList[assetId]; 
        return (asset.id, asset.name, asset.desc, asset.ownershipId, asset.depositoryAddress);
    }
    
    function updateOwnershipId(bytes32 assetId, bytes32 _ownershipId) public {
        AssetObject memory asset;
        asset = assetList[assetId];
        asset.ownershipId = _ownershipId;
        emit OwnershipUpdated(now, assetId, asset.ownershipId);
        
    }
    
    function signAsset(bytes32 assetId, string _depositorySignature) public view {
        AssetObject memory asset;
        asset = assetList[assetId]; 
        asset.depositorySignature = _depositorySignature;
    }
    
    function getOwnershipIdFromAssetId(bytes32 assetId) public view returns(bytes32) {
        AssetObject memory asset;
        asset = assetList[assetId]; 
        return asset.ownershipId;
    }
}