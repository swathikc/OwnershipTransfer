pragma solidity ^0.4.0;

contract Asset {
    
    struct AssetObject {
        bytes32 id;
        string name;
        string desc;
        address owner;
        address depositoryAddress;
        string depositorySignature;
    }
    mapping (bytes32 => AssetObject) assetList;
    
    
    event AssetCreated(uint256 time, bytes32 id, string name, string desc, address owner, address depositoryAddress);
    event OwnerUpdated(uint256 time, bytes32 assetId, address owner);
    
    function createAsset(string _name, string _desc, address _owner, address _depositoryAddress) public payable {
        AssetObject memory asset;
        asset.name = _name;
        asset.desc = _desc;
        asset.owner = _owner;
        uint random_number = uint(blockhash(block.number-1))%10 + 1;
        asset.id = keccak256(uintToByte32(random_number));
        asset.depositoryAddress = _depositoryAddress;
        assetList[asset.id] = asset;
        emit AssetCreated(now, asset.id, asset.name, asset.desc, asset.owner, asset.depositoryAddress);
    }
    
    function uintToByte32(uint256 x) internal pure returns (bytes b) {
        b = new bytes(32);
        assembly { mstore(add(b, 32), x) }
    }
    
    function getAssetById(bytes32 assetId) public view returns(bytes32, string, string, address, address) {
        AssetObject memory asset;
        asset = assetList[assetId]; 
        return (asset.id, asset.name, asset.desc, asset.owner, asset.depositoryAddress);
    }
    
    function updateOwner(bytes32 assetId, address _owner) public {
        AssetObject memory asset;
        asset = assetList[assetId];
        asset.owner = _owner;
        emit OwnerUpdated(now, assetId, asset.owner);
        
    }
    
    function signAsset(bytes32 assetId, string _depositorySignature) public view {
        AssetObject memory asset;
        asset = assetList[assetId]; 
        asset.depositorySignature = _depositorySignature;
    }
    
    function getOwnerFromAssetId(bytes32 assetId) public view returns(address) {
        AssetObject memory asset;
        asset = assetList[assetId]; 
        return asset.owner;
    }
}
