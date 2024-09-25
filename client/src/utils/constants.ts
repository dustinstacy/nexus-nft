import igcArtifact from '../../../contracts/artifacts/contracts/erc20-currency/IGC.sol/InGameCurrency.json';
import purchaseIGCArtifact from '../../../contracts/artifacts/contracts/interactions/PurchaseIGC.sol/PurchaseIGC.json';
import piecesArtifact from '../../../contracts/artifacts/contracts/erc1155-assets/Pieces.sol/Pieces.json';
import deploymentAddresses from '../../../contracts/ignition/deployments/chain-31337/deployed_addresses.json';

export const igcABI = igcArtifact.abi;
export const igcAddress = deploymentAddresses['IGCModule#InGameCurrency'];
export const purchaseIGCABI = purchaseIGCArtifact.abi;
export const purchaseIGCAddress =
  deploymentAddresses['PurchaseIGCModule#PurchaseIGC'];
export const piecesABI = piecesArtifact.abi;
export const piecesAddress = deploymentAddresses['PiecesModule#Pieces'];
