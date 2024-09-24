// components/Board.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { useWallet } from '../../../context/WalletProvider';

import Card from '../Card/Card';
import styles from './Board.module.css';

import { processorABI, processorAddress } from '../../../utils/constants';
import { cardsABI, cardsAddress } from '../../../utils/constants';

const Board: React.FC = () => {
  const { accounts, signer } = useWallet();
  const [processor, setProcessor] = useState<ethers.Contract | null>(null);
  const [minter, setMinter] = useState<ethers.Contract | null>(null);
  const [cards, setCards] = useState<Card[]>([]);
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [board, setBoard] = useState<(Card | null)[]>(Array(9).fill(null));
  const [cardPlaced, setCardPlaced] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initContract = async () => {
      if (signer) {
        try {
          const processorInstance = new ethers.Contract(
            processorAddress,
            processorABI,
            signer
          );
          const minterInstance = new ethers.Contract(
            cardsAddress,
            cardsABI,
            signer
          );

          setProcessor(processorInstance);
          setMinter(minterInstance);
          await fetchUserCards(signer);
          setLoading(false);
        } catch (error) {
          console.error('Error initializing contracts:', error);
          setLoading(false);
        }
      }
    };

    initContract();
  }, [signer, accounts]);

  const fetchUserCards = async (signer: ethers.Signer) => {
    const cardIds: number[] = [];

    // Loop through the card types to check balance
    for (let id = 0; id < 10; id++) {
      const balance = await minter?.balanceOf(accounts[0], id);
      if (balance > 0) {
        cardIds.push(id);
      }
    }

    // Fetch the metadata for each card owned by the user
    const userCardsData = await Promise.all(
      cardIds.map(async (id) => {
        // Construct the IPFS URL for the card's metadata
        const response = await fetch(
          `https://ipfs.io/ipfs/QmZTaQEJbwhizr6wVw9T4jfeqPmDiT3nuXSLqeSbhiNkB6/${id}.json`
        );
        const cardData = await response.json();

        return {
          id,
          name: cardData.name,
          description: cardData.description,
          rarity: cardData.rarity,
          maxSupply: cardData.maxSupply,
          image: cardData.image,
          attributes: cardData.attributes.map((attr: Attribute) => ({
            trait_type: attr.trait_type,
            value: attr.value,
          })),
        };
      })
    );

    setCards(userCardsData);
  };

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

  const mintCard = async () => {
    if (!minter) {
      console.error('Minter contract is not initialized');
      return;
    }

    const randomIndex = Math.floor(Math.random() * 10);

    try {
      await minter.mintCard(randomIndex);
      console.log('Minted Card', randomIndex);
    } catch (error) {
      console.error('Error minting card:', error);
    }
  };

  return (
    <div>
      <button className={styles.mintButton} onClick={mintCard}>
        Mint a Card
      </button>
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
