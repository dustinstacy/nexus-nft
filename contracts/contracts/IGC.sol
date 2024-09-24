//SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract InGameCurrency is ERC20 {
    constructor(address dev, uint256 initialSupply) ERC20("InGameCurrency", "IGC") {
        _mint(dev, initialSupply);
    }
}
