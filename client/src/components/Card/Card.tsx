// components/Card.tsx
'use client';

import React from 'react';
import styles from './Card.module.css'; // Import the CSS module for styling

const Card: React.FC<Card> = ({ name, image, attributes }) => {
  const up = attributes.find(
    (attr: Attribute) => attr.trait_type === 'up'
  )?.value;
  const right = attributes.find(
    (attr: Attribute) => attr.trait_type === 'right'
  )?.value;
  const down = attributes.find(
    (attr: Attribute) => attr.trait_type === 'down'
  )?.value;
  const left = attributes.find(
    (attr: Attribute) => attr.trait_type === 'left'
  )?.value;

  return (
    <div className={styles.card}>
      <img src={image} alt={name} className={styles.cardImage} />
      <div className={styles.attributesOverlay}>
        <div className={`${styles.attributeCircle} ${styles.up}`}>
          <div className={styles.upText}>{up}</div>
        </div>
        <div className={`${styles.attributeCircle} ${styles.right}`}>
          <div className={styles.rightText}>{right}</div>
        </div>
        <div className={`${styles.attributeCircle} ${styles.down}`}>
          <div className={styles.downText}>{down}</div>
        </div>
        <div className={`${styles.attributeCircle} ${styles.left}`}>
          <div className={styles.leftText}>{left}</div>
        </div>
      </div>
    </div>
  );
};

export default Card;
