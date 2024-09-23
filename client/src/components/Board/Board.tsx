// components/Board.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

import Card from '../Card/Card';
import styles from './Board.module.css';

import { abi, contractAddress } from './constants';
import { generateRandomCard } from '../../utils/Randomizers';

const Board: React.FC = () => {
  const [contract, setContract] = useState<ethers.Contract | null>(null);
  const [cards, setCards] = useState<CardProps[]>([]);
  const [selectedCard, setSelectedCard] = useState<CardProps | null>(null);
  const [board, setBoard] = useState<(CardProps | null)[]>(Array(9).fill(null));
  const [cardPlaced, setCardPlaced] = useState(false);

  useEffect(() => {
    const initContract = async () => {
      if (typeof window !== 'undefined' && window.ethereum) {
        try {
          const provider = new ethers.BrowserProvider(window.ethereum);
          const signer = await provider.getSigner(); // Optional: Use signer if needed
          const contractInstance = new ethers.Contract(
            contractAddress,
            abi,
            signer
          );
          setContract(contractInstance);
        } catch (error) {
          console.error('Error initializing contract:', error);
        }
      } else {
        console.error('Ethereum provider not found. Please install MetaMask.');
      }
    };

    initContract();
  }, []);

  // Generate cards on client side only
  useEffect(() => {
    const generatedCards = Array.from({ length: 10 }, (_, index) =>
      generateRandomCard(index + 1)
    );
    setCards(generatedCards);
  }, []);

  // Handle card selection
  const handleCardClick = (card: CardProps) => {
    setSelectedCard(card);
    setCardPlaced(false);
  };

  // Handle board cell click
  const handleCellClick = (index: number, selectedCard: CardProps | null) => {
    if (selectedCard && board[index] === null) {
      // Place the selected card on the board
      const newBoard = [...board];
      newBoard[index] = selectedCard;

      // Remove the selected card from the available cards
      const newCards = cards.filter((card) => card !== selectedCard);

      battleProcessor(index, selectedCard);

      // Update the states
      setBoard(newBoard);
      setCards(newCards);
      setSelectedCard(null);
      setCardPlaced(true);
    }
  };

  const battleProcessor = async (
    index: number,
    selectedCard: CardProps | null
  ) => {
    const up = board[index - 3];
    const right = board[index + 1];
    const left = board[index - 1];
    const down = board[index + 3];
    const leftColumn = [0, 3, 6];
    const rightColumn = [2, 5, 8];

    // Direction is relative from the active card's context
    // e.g. cardUP means the target is above the active card
    const cardUP = up?.down;
    const cardRight = !rightColumn.includes(index) && right?.left;
    const cardDown = down?.up;
    const cardLeft = !leftColumn.includes(index) && left?.right;

    let result = null;

    if (cardUP) {
      result = await contract?.processBattle(selectedCard?.up, cardUP);
    }
    if (cardRight) {
      result = await contract?.processBattle(selectedCard?.right, cardRight);
    }
    if (cardDown) {
      result = await contract?.processBattle(selectedCard?.down, cardDown);
    }
    if (cardLeft) {
      result = await contract?.processBattle(selectedCard?.left, cardLeft);
    }

    console.log('result', result);
  };

  return (
    <div>
      <h1>Card Board</h1>
      <div className={styles.cardContainer}>
        {cards.map((card, index) => (
          <Card key={index} {...card} onClick={() => handleCardClick(card)} />
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
