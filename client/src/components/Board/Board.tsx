// components/Board.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useReadContract } from 'wagmi';

import Card from '../Card/Card';
import styles from './Board.module.css';

import { CardProps } from '../../../global.d';

import { abi, contractAddress } from './constants';
import { generateRandomCard } from '../../utils/Randomizers';

const Board: React.FC = () => {
  // State to hold the cards
  const [cards, setCards] = useState<CardProps[]>([]);
  // State to hold the currently selected card
  const [selectedCard, setSelectedCard] = useState<CardProps | null>(null);
  // State to hold the currently selected card
  const [targetCard, setTargetCard] = useState<CardProps | null>(null);

  const [direction, setDirection] = useState<string>('');
  // State to hold the board cells
  const [board, setBoard] = useState<(CardProps | null)[]>(Array(9).fill(null));

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
  };

  const result = useReadContract({
    abi,
    address: contractAddress as `0x${string}`,
    functionName: 'processBattle',
  });

  console.log(result.data);

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
    }
  };

  const battleProcessor = (index: number, selectedCard: CardProps | null) => {
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

    if (cardUP) {
      console.log('up');
      setTargetCard(up);
      setDirection('up');
    }
    if (cardRight) {
      console.log('right');
      setTargetCard(right);
      setDirection('right');
    }
    if (cardDown) {
      setTargetCard(down);
      setDirection('down');
    }
    if (cardLeft) {
      console.log('left');
      setTargetCard(left);
      setDirection('left');
    }
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
