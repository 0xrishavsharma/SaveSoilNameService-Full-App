// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Domains {
    mapping(string => address) public domains;
    mapping(string => string) public records;

    constructor() {
        console.log("Let's make it happen. #SaveSoil");
    }

    function register(string calldata name) public {
      //Checking that the domain is not already registered!
        require(domains[name] == address(0), "The domain is already registered, please choose another one!" );
        domains[name] = msg.sender;
        console.log("%s has registered a domain name", msg.sender);
    }

    function getAddress(string calldata name) public view returns (address) {
        return domains[name];
    }

    function setRecord(string calldata name, string calldata record) public {
      require(domains[name] == msg.sender);
      records[name] = record;
    }

    function getRecord(string calldata name) view public returns(string memory) {
      return records[name];
    }
}
