// global.d.ts
interface Window {
  ethereum: any; // You can replace 'any' with a more specific type if you know it
}

export interface CardProps {
  up?: string;
  right?: string;
  down?: string;
  left?: string;
  onClick?: () => void;
}
