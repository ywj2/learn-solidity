// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.27;

contract Bank {
    mapping (address=>uint) vault;

    function check() view public returns (uint) {
        return vault[msg.sender];
    }

    function save(uint money) public {
        vault[msg.sender] += money;
    }

    function withdraw(uint money) public {
        uint balance = vault[msg.sender];
        require(balance >= money, "not enough balance");
        vault[msg.sender] -= money;
        address payable a = payable(msg.sender);
        a.transfer(money);
    }
}
