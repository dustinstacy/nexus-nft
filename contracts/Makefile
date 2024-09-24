-include .env

.PHONY: all test 

deploy-processor:
	@echo "Deploying contracts..."
	@npx hardhat ignition deploy ./ignition/modules/BattleProcessor.ts --network localhost

deploy-currency:
	@echo "Deploying contracts..."
	@npx hardhat ignition deploy ./ignition/modules/InGameCurrency.ts --network localhost

deploy-cards:
	@echo "Deploying contracts..."
	@npx hardhat ignition deploy ./ignition/modules/Cards.ts --network localhost

deploy-all:
	@echo "Deploying contracts..."
	@npx hardhat ignition deploy ./ignition/modules/BattleProcessor.ts --network localhost
	@npx hardhat ignition deploy ./ignition/modules/InGameCurrency.ts --network localhost
	@npx hardhat ignition deploy ./ignition/modules/Cards.ts --network localhost