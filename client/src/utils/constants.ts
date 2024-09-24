import currencyArtifact from '../../../contracts/artifacts/contracts/IGC.sol/InGameCurrency.json';
import processorArtifact from '../../../contracts/artifacts/contracts/BattleProcessor.sol/BattleProcessor.json';
import cardsArtifact from '../../../contracts/artifacts/contracts/Cards.sol/Cards.json';
import deploymentAddresses from '../../../contracts/ignition/deployments/chain-31337/deployed_addresses.json';

export const currencyABI = currencyArtifact.abi;
export const currencyAddress =
  deploymentAddresses['CurrencyModule#InGameCurrency'];
export const processorABI = processorArtifact.abi;
export const processorAddress =
  deploymentAddresses['ProcessorModule#BattleProcessor'];
export const cardsABI = cardsArtifact.abi;
export const cardsAddress = deploymentAddresses['CardsModule#Cards'];
