pragma solidity ^0.4.0;
import "./Asset.sol";

contract Depository {
    bytes32 id;
    string name;
    address employee;
    mapping (bytes32 => Ownership) ownershipList;
    Asset assetContract;
    
    struct Ownership {
        bytes32 id;
        address owner;
        bytes32 previousOwnershipId;
        bytes32 assetId;
        address depository;
    }
    
    event DepositoryContractDeployed(uint256 time, address depositoryContract, bytes32 id, string name, address employee);
    event OwnershipCreated(uint256 time, bytes32 id, address owner, bytes32 previousOwnershipId, bytes32 assetId, address depository, address depositoryAddress);
    
    constructor(string _name) public {
        uint random_number = uint(blockhash(block.number-1))%10 + 1;
        employee = msg.sender;
        name = _name;
        id = keccak256(uintToByte32(random_number));
        emit DepositoryContractDeployed(now, this, id, name, employee);
    }
    
    function getEmployee() public constant returns(address) {
        return employee;
    }
    
    function createFirstOwnership(address _owner, bytes32 _assetId, address assetAddress) public onlyDepository {
        assetContract = Asset(assetAddress);
        Ownership memory ownership;
        ownership.owner = _owner;
        ownership.assetId = _assetId;
        ownership.depository = msg.sender;
        uint random_number = uint(blockhash(block.number-1))%10 + 1;
        ownership.id = keccak256(uintToByte32(random_number));
        ownership.previousOwnershipId = ownership.id;
        ownershipList[ownership.id] = ownership;
        emit OwnershipCreated(now, ownership.id, ownership.owner, ownership.previousOwnershipId, ownership.assetId, ownership.depository, this);
        /* assetContract.updateOwnershipId(ownership.assetId, ownership.id); */
    }

    function createOwnership(address _owner, bytes32 _previousOwnershipId, bytes32 _assetId, address assetAddress) public onlyDepository {
        assetContract = Asset(assetAddress);
        Ownership memory ownership;
        ownership.owner = _owner;
        ownership.previousOwnershipId = _previousOwnershipId;
        ownership.assetId = _assetId;
        ownership.depository = msg.sender;
        uint random_number = uint(blockhash(block.number-1))%10 + 1;
        ownership.id = keccak256(uintToByte32(random_number));
        ownershipList[ownership.id] = ownership;
        emit OwnershipCreated(now, ownership.id, ownership.owner, ownership.previousOwnershipId, ownership.assetId, ownership.depository, this);
        /* assetContract.updateOwnershipId(ownership.assetId, ownership.id); */
    }
    
    function getOwnerById(bytes32 ownership_id) public constant returns(address) {
        Ownership memory ownership;
        ownership = ownershipList[ownership_id];
        return ownership.owner;
    }
    
    function getOwnershipById(bytes32 ownership_id) public view returns(bytes32, address, bytes32, bytes32, address) {
        Ownership memory ownership;
        ownership = ownershipList[ownership_id];
        return (ownership.id, ownership.owner, ownership.previousOwnershipId, ownership.assetId, ownership.depository);
    }
    
    function uintToByte32(uint256 x) internal pure returns (bytes b) {
        b = new bytes(32);
        assembly { mstore(add(b, 32), x) }
    }
    
    modifier onlyDepository() {
        require(
            msg.sender == employee    
        );
        _;
    }
}