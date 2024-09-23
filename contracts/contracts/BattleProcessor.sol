//SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import {console} from "hardhat/console.sol";

contract BattleProcessor {
    struct BattleState {
        string[] board;
        bool decksShuffled;
        bool handsDealt;
        bool battleStarted;
        bool isP1Turn;
    }

    struct Card {
        uint8 up;
        uint8 down;
        uint8 left;
        uint8 right;
    }

    function evaluate(uint8 activeValue, uint8 targetValue) internal pure returns (uint8) {
        if (activeValue > targetValue) {
            return 1;
        } else if (activeValue <= targetValue) {
            return 2;
        }
    }

    function processBattle(uint8 activeValue, uint8 targetValue) public pure returns (uint8) {
        return evaluate(activeValue, targetValue);
    }
}
