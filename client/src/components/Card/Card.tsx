// components/Card.tsx
"use client"; // Optional if no server-side code is involved

import React from 'react';
import { CardProps } from '../types'; // Import the shared type
import styles from './Card.module.css'; // Import the CSS module for styling

const Card: React.FC<CardProps> = ({ up, right, down, left, onClick }) => {
  return (
    <div className={styles.card} onClick={onClick}>
      {up && <div className={`${styles.side} ${styles.up}`}>{up}</div>}
      {right && <div className={`${styles.side} ${styles.right}`}>{right}</div>}
      {down && <div className={`${styles.side} ${styles.down}`}>{down}</div>}
      {left && <div className={`${styles.side} ${styles.left}`}>{left}</div>}
    </div>
  );
};

export default Card;
