import contractArtifact from '../../../../contracts/artifacts/contracts/BattleProcessor.sol/BattleProcessor.json';
import deploymentAddresses from '../../../../contracts/ignition/deployments/chain-31337/deployed_addresses.json';

export const abi = contractArtifact.abi;
export const contractAddress =
  deploymentAddresses['ProcessorModule#BattleProcessor'];
