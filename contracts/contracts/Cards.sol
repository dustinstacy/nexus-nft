// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Cards is ERC1155, Ownable {
    mapping(uint256 => uint256) public totalSupply; // Total minted count per card type
    uint256 public cardCount; // Total number of card types

    constructor() ERC1155("ipfs://QmZTaQEJbwhizr6wVw9T4jfeqPmDiT3nuXSLqeSbhiNkB6/{id}.json") Ownable(msg.sender) {}

    function mintCard(uint256 cardId) public {
        totalSupply[cardId] += 1;
        _mint(msg.sender, cardId, 1, "");
    }
}
