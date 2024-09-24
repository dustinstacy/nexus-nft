import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import { testWallet } from "../../utils/constants";

const CurrencyModule = buildModule("CurrencyModule", (m) => {

  const currency = m.contract("InGameCurrency", [testWallet, BigInt(10000e18)]);

  return { currency };
});

export default CurrencyModule;
