import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import { testWallet } from "../../utils/constants";
import deploymentAddresses from "../deployments/chain-31337/deployed_addresses.json";

const PurchaseIGCModule = buildModule("PurchaseIGCModule", (m) => {
  const owner = testWallet;  
  const igcToken = deploymentAddresses['IGCModule#InGameCurrency'];
  const tokenPrice = 1000;
  const purchaseIGC = m.contract("PurchaseIGC", [owner, igcToken, tokenPrice]);

  return { purchaseIGC };
});

export default PurchaseIGCModule;
 