// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Cards is ERC1155, Ownable {
    struct Card {
        uint256 cardId;
        string name;
        string description;
        string image;
        uint256 rarity;
        Attribute[] attributes;
    }

    struct Attribute {
        string traitType;
        uint256 value;
    }

    mapping(uint256 cardId => uint256 totalSupply) public totalCardSupply;
    mapping(uint256 cardId => Card) public cards;

    constructor(string memory _baseURI, address _owner) ERC1155(_baseURI) Ownable(_owner) {}

    function mintCard(uint256 cardId) public {
        totalCardSupply[cardId] += 1;
        _mint(msg.sender, cardId, 1, "");
    }
}
