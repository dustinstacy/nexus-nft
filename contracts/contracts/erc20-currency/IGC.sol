//SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/// @title InGameCurrency
/// @author Dustin Stacy
/// @notice ERC20 token for in-game currency
contract InGameCurrency is ERC20 {
    constructor() ERC20("InGameCurrency", "IGC") {}

    fallback() external payable {}

    receive() external payable {}

    function supportsInterface(bytes4 interfaceID) external pure returns (bool) {
        return interfaceID == type(IERC20).interfaceId; // If your token is ERC-20
    }

    /// @notice Returns the number of decimals for the token
    /// @dev This is a virtual override of the decimals function in ERC20
    function decimals() public view virtual override returns (uint8) {
        return 0;
    }

    /// @notice Mints new tokens
    /// @param to Address to mint tokens to
    /// @param amount Amount of tokens to mint
    function mint(address to, uint256 amount) public {
        _mint(to, amount);
    }

    /// @notice Burns tokens
    /// @param from Address to burn tokens from
    /// @param amount Amount of tokens to burn
    function burn(address from, uint256 amount) public {
        _burn(from, amount);
    }
}
