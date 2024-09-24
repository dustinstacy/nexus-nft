declare global {
  interface Eip1193Provider {
    isMetaMask?: boolean;
    request: (args: { method: string; params?: any[] }) => Promise<any>;
    on: (eventName: string, callback: (...args: any[]) => void) => void;
    removeListener: (
      eventName: string,
      callback: (...args: any[]) => void
    ) => void;
  }

  interface Window {
    ethereum?: Eip1193Provider;
  }

  // Represents a single attribute of a card
  interface Attribute {
    trait_type: string; // The type of the attribute (e.g., "up", "right", etc.)
    value: number; // The value of the attribute
  }

  // Represents the structure of a card
  interface Card {
    id: number; // Unique identifier for the card
    name: string; // Name of the card
    description: string; // Description of the card
    rarity: string; // Rarity of the card
    maxSupply: number; // Maximum supply of this card
    image: string; // URL for the card's image
    attributes: Attribute[]; // Array of attributes for the card
  }
}

export {};
