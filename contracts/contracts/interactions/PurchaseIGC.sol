// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "../erc20-currency/IGC.sol";
import {console} from "hardhat/console.sol";

/// @title PurchaseIGC
/// @author Dustin Stacy
/// @notice Contract for purchasing InGameCurrency
contract PurchaseIGC is Ownable {
    /// @notice The InGameCurrency token
    InGameCurrency public igcToken;

    /// @notice The price of each token
    uint256 public tokenPrice;

    /// @notice Emitted when tokens are purchased
    event TokensPurchased(address buyer, uint256 amount, uint256 totalCost);

    /// @param _owner Address of the owner of the contract
    /// @param _igcToken Address of the InGameCurrency token
    /// @param _tokenPrice Price of each token
    constructor(address _owner, InGameCurrency _igcToken, uint256 _tokenPrice) Ownable(_owner) {
        igcToken = _igcToken;
        tokenPrice = _tokenPrice;
    }

    /// @notice Purchase tokens
    /// @param amount Amount of tokens to purchase
    function buyTokens(address buyer, uint256 amount) public payable {
        require(amount > 0, "Must purchase at least one token");

        igcToken.mint(buyer, amount);

        emit TokensPurchased(buyer, amount, msg.value);
    }

    /// @notice Allows the owner to withdraw Ether from the contract
    function withdraw() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }
}
