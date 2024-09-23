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

  interface CardProps {
    up?: string;
    right?: string;
    down?: string;
    left?: string;
    onClick?: () => void;
  }
}

export {};
