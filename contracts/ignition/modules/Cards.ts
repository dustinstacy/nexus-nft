import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import { baseURI, testWallet } from "../../utils/constants";

const CardsModule = buildModule("CardsModule", (m) => {

  const cards = m.contract("Cards", [baseURI, testWallet]);

  return { cards };
});

export default CardsModule;
