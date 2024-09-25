// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/// @title Pieces
/// @author Dustin Stacy
/// @notice Contract for minting and managing pieces
contract Pieces is ERC1155, Ownable {
    struct Piece {
        uint256 pieceId;
        uint256 maxSupply;
        string image;
        string description;
        string name;
        Attribute[] attributes;
    }

    struct Attribute {
        string traitType;
        uint256 value;
    }

    uint256 public nextPieceId;

    mapping(uint256 pieceId => uint256 totalSupply) public totalPieceSupply;
    mapping(uint256 pieceId => Piece) public pieces;

    /// @param _baseURI Base URI for the contract
    /// @param _owner Address of the owner of the contract
    constructor(string memory _baseURI, address _owner) ERC1155(_baseURI) Ownable(_owner) {}

    /// @notice Mint a new piece
    /// @param pieceId ID of the piece to mint
    function mintPiece(uint256 pieceId) public {
        totalPieceSupply[pieceId] += 1;
        _mint(msg.sender, pieceId, 1, "");
    }

    /// @notice Burn a piece
    /// @param pieceId ID of the piece to burn
    function burnPiece(uint256 pieceId) public {
        require(balanceOf(msg.sender, pieceId) > 0, "User does not own this piece");
        totalPieceSupply[pieceId] -= 1;
        _burn(msg.sender, pieceId, 1);
    }

    /// @notice Add a new piece
    /// @param maxSupply Maximum supply of the piece
    /// @param image URI of the image for the piece
    /// @param description Description of the piece
    /// @param name Name of the piece
    /// @param attributes Array of attributes for the piece
    function addPiece(
        uint256 maxSupply,
        string memory image,
        string memory description,
        string memory name,
        Attribute[] memory attributes
    ) public {
        pieces[nextPieceId] = Piece(nextPieceId, maxSupply, image, description, name, attributes);
        nextPieceId += 1;
    }
}
