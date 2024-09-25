import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const IGCModule = buildModule("IGCModule", (m) => {

  const igc = m.contract("InGameCurrency");

  return { igc };
});

export default IGCModule;
