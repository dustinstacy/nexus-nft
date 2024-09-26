-include .env

.PHONY: all test 

deploy-igc:
	@echo "Deploying contracts..."
	@npx hardhat ignition deploy ./ignition/modules/IGC.ts --network localhost

deploy-purchase-igc:
	@echo "Deploying contracts..."
	@npx hardhat ignition deploy ./ignition/modules/PurchaseIGC.ts --network localhost

deploy-pieces:
	@echo "Deploying contracts..."
	@npx hardhat ignition deploy ./ignition/modules/Pieces.ts --network localhost

deploy-all:
	@echo "Deploying contracts..."
	@npx hardhat ignition deploy ./ignition/modules/IGC.ts --network localhost
	@npx hardhat ignition deploy ./ignition/modules/PurchaseIGC.ts --network localhost
	@npx hardhat ignition deploy ./ignition/modules/Pieces.ts --network localhost
