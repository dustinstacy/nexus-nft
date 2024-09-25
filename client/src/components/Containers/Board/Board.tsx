// components/Board.tsx
'use client';

import React, { useState } from 'react';

import Card from '../Card/Card';
import styles from './Board.module.css';

const Board: React.FC = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [board, setBoard] = useState<(Card | null)[]>(Array(9).fill(null));
  const [cardPlaced, setCardPlaced] = useState(false);

  const handleCardClick = (card: Card) => {
    setSelectedCard(card);
    setCardPlaced(false);
  };

  const handleCellClick = (index: number) => {
    if (selectedCard && !board[index]) {
      const newBoard = [...board];
      newBoard[index] = selectedCard;
      const newCards = cards.filter((card) => card !== selectedCard);
      setBoard(newBoard);
      setCards(newCards);
      setSelectedCard(null);
    }
  };

  return (
    <div>
      <div className={styles.cardContainer}>
        {cards.map((card, index) => (
          <div
            key={index}
            className={styles.cardWrapper}
            onClick={() => handleCardClick(card)}
          >
            <Card {...card} />
          </div>
        ))}
      </div>
      <div className={styles.board}>
        {board.map((cell, index) => (
          <div
            key={index}
            className={styles.boardCell}
            onClick={() => handleCellClick(index)}
            style={{ backgroundColor: cell ? '#d0ffd0' : '#e0e0e0' }} // Highlight if occupied
          >
            {cell ? <Card {...cell} /> : null}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Board;
