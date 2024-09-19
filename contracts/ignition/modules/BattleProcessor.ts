import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const ProcessorModule = buildModule("ProcessorModule", (m) => {

  const processor = m.contract("BattleProcessor");

  return { processor };
});

export default ProcessorModule;
