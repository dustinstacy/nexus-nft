import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import { baseURI, testWallet } from "../../utils/constants";

const PiecesModule = buildModule("PiecesModule", (m) => {

  const pieces = m.contract("Pieces", [baseURI, testWallet]);

  return { pieces };
});

export default PiecesModule;
