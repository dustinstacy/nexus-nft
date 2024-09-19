// components/Board.tsx
"use client"; 

import React, { useState, useEffect } from 'react';
import Card from '../Card/Card'; 
import { CardProps } from '../types'; 
import styles from './Board.module.css'; 
import ethers from 'ethers';

const abi = [
    {
      "inputs": [
        {
          "components": [
            {
              "internalType": "uint8",
              "name": "up",
              "type": "uint8"
            },
            {
              "internalType": "uint8",
              "name": "down",
              "type": "uint8"
            },
            {
              "internalType": "uint8",
              "name": "left",
              "type": "uint8"
            },
            {
              "internalType": "uint8",
              "name": "right",
              "type": "uint8"
            }
          ],
          "internalType": "struct BattleProcessor.Card",
          "name": "active",
          "type": "tuple"
        },
        {
          "components": [
            {
              "internalType": "uint8",
              "name": "up",
              "type": "uint8"
            },
            {
              "internalType": "uint8",
              "name": "down",
              "type": "uint8"
            },
            {
              "internalType": "uint8",
              "name": "left",
              "type": "uint8"
            },
            {
              "internalType": "uint8",
              "name": "right",
              "type": "uint8"
            }
          ],
          "internalType": "struct BattleProcessor.Card",
          "name": "target",
          "type": "tuple"
        }
      ],
      "name": "processBattle",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
]
  
const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

let signer = null;

let provider;
if (window.ethereum == null) {

    // If MetaMask is not installed, we use the default provider,
    // which is backed by a variety of third-party services (such
    // as INFURA). They do not have private keys installed,
    // so they only have read-only access
    console.log("MetaMask not installed; using read-only defaults")
    provider = ethers.getDefaultProvider()

} else {

    // Connect to the MetaMask EIP-1193 object. This is a standard
    // protocol that allows Ethers access to make all read-only
    // requests through MetaMask.
    provider = new ethers.BrowserProvider(window.ethereum)

    // It also provides an opportunity to request access to write
    // operations, which will be performed by the private key
    // that MetaMask manages for the user.
    signer = await provider.getSigner();
}

const contract = new ethers.Contract(contractAddress, abi, signer);


// Helper function to generate a random number between 0 and 9
const getRandomValue = (): string => {
  const randomNumber = Math.floor(Math.random() * 10); // Random number between 0 and 9
  return `${randomNumber}`;
};

// Function to generate a card with random values
const generateRandomCard = (index: number): CardProps => ({
  up: getRandomValue(),
  right: getRandomValue(),
  down: getRandomValue(),
  left: getRandomValue(),
});

const Board: React.FC = () => {
  // State to hold the cards
  const [cards, setCards] = useState<CardProps[]>([]);
  // State to hold the currently selected card
  const [selectedCard, setSelectedCard] = useState<CardProps | null>(null);
  // State to hold the board cells
  const [board, setBoard] = useState<(CardProps | null)[]>(Array(9).fill(null));

  // Generate cards on client side only
  useEffect(() => {
    const generatedCards = Array.from({ length: 10 }, (_, index) => generateRandomCard(index + 1));
    setCards(generatedCards);
  }, []);

  // Handle card selection
  const handleCardClick = (card: CardProps) => {
    setSelectedCard(card);
  };

  // Handle board cell click
  const handleCellClick = (index: number, selectedCard : CardProps | null) => {
    if (selectedCard && board[index] === null) {
      // Place the selected card on the board
      const newBoard = [...board];
      newBoard[index] = selectedCard;

      // Remove the selected card from the available cards
      const newCards = cards.filter(card => card !== selectedCard);

      battleProcessor(index, selectedCard);

      // Update the states
      setBoard(newBoard);
      setCards(newCards);
      setSelectedCard(null);
    }
  };

  const battleProcessor = (index: number, selectedCard: CardProps | null) => { 
    const up = board[index - 3]
    const right = board[index + 1]
    const left = board[index - 1]
    const down = board[index + 3]
    const leftColumn = [0, 3, 6]
    const rightColumn = [2, 5, 8]

    // Direction is relative from the active card's context
    // e.g. cardUP means the target is above the active card
    const cardUP = up?.down
    const cardRight = !rightColumn.includes(index) && right?.left
    const cardDown = down?.up
    const cardLeft = !leftColumn.includes(index) && left?.right

    if (cardUP) {
      contract.processBattle(selectedCard, up)
    }
    if (cardRight) {
      contract.processBattle(selectedCard, right)
    }
    if (cardDown) {
      contract.processBattle(selectedCard, down)
    }
    if (cardLeft) {
      contract.processBattle(selectedCard, left)
    }
  }

  return (
    <div>
      <h1>Card Board</h1>
      <div className={styles.cardContainer}>
        {cards.map((card, index) => (
          <Card
            key={index}
            {...card}
            onClick={() => handleCardClick(card)}
          />
        ))}
      </div>
      <div className={styles.board}>
        {board.map((cell, index) => (
          <div
            key={index}
            className={styles.boardCell}
            onClick={() => handleCellClick(index, selectedCard)}
          >
            {cell ? <Card {...cell} /> : null}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Board;
