import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const CardsModule = buildModule("CardsModule", (m) => {

  const cards = m.contract("Cards");

  return { cards };
});

export default CardsModule;
