// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

contract Bank {
    mapping(address => uint) vault;

    function check() public view returns (uint) {
        return vault[msg.sender];
    }

    function bankBalance() public view returns (uint) {
        return address(this).balance;
    }

    function save() public payable  {
        vault[msg.sender] += msg.value;
    }

    function withdraw(uint money) public {
        uint balance = vault[msg.sender];
        require(balance >= money, "not enough balance");
        vault[msg.sender] -= money;
        address payable a = payable(msg.sender);
        a.transfer(money);
    }
}
