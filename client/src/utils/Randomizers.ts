import { CardProps } from '../../global.d';

// Helper function to generate a random number between 0 and 9
export const getRandomValue = (): string => {
  const randomNumber = Math.floor(Math.random() * 10); // Random number between 0 and 9
  return `${randomNumber}`;
};

// Function to generate a card with random values
export const generateRandomCard = (index: number): CardProps => ({
  up: getRandomValue(),
  right: getRandomValue(),
  down: getRandomValue(),
  left: getRandomValue(),
});
