// Helper function to generate a random number between 0 and 9
export const getRandomValue = (): string => {
  const randomNumber = Math.floor(Math.random() * 10); // Random number between 0 and 9
  return `${randomNumber}`;
};

// Function to generate new attributes for a card
export const generateRandomAttributes = (): CardAttributes => ({
  up: getRandomValue(),
  right: getRandomValue(),
  down: getRandomValue(),
  left: getRandomValue(),
});
