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

    function evaluate(uint8 activeValue, uint8 targetValue) internal pure {
        if (activeValue > targetValue) {
            // active wins
        }
        else if (activeValue <= targetValue) {
            // do nothing
        }
    }

    function processBattle(Card memory active, Card memory target) public pure {
        console.log(active.up, active.down, active.left, active.right);
        console.log(target.up, target.down, target.left, target.right);
    }
}
