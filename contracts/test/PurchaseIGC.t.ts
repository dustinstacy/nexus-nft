import { expect } from "chai";
import { ethers } from "hardhat";
import { Signer } from "ethers";
import { InGameCurrency } from "../typechain-types";
import { PurchaseIGC } from "../typechain-types";

describe("PurchaseIGC Contract", function () {
    let purchaseIGC: PurchaseIGC;
    let igcToken: InGameCurrency;
    let owner: Signer;
    let buyer: Signer;
    const tokenPrice = ethers.parseEther("0.01"); // Set token price to 0.01 ETH

    beforeEach(async () => {
        [owner, buyer] = await ethers.getSigners();

        // Deploy the IGC token contract
        const IGC = await ethers.getContractFactory("InGameCurrency");
        igcToken = await IGC.deploy();

        // Deploy the PurchaseIGC contract
        const PurchaseIGC = await ethers.getContractFactory("PurchaseIGC");
        purchaseIGC = await PurchaseIGC.deploy(await owner.getAddress(), igcToken.getAddress(), tokenPrice);
    });

    it("should purchase tokens", async () => {
        const amount = 5; // Number of tokens to purchase
        const totalCost = (tokenPrice * BigInt(amount)); // Total cost for the tokens

        // Buyer sends the correct amount of ETH to purchase tokens
        await expect(purchaseIGC.connect(buyer).buyTokens(await buyer.getAddress(), amount, { value: totalCost }))
            .to.emit(purchaseIGC, "TokensPurchased")
            .withArgs(await buyer.getAddress(), amount, totalCost);

        // Verify the buyer's balance of IGC tokens
        const balance = await igcToken.balanceOf(await buyer.getAddress());
        expect(balance).to.equal(amount);
    });

    it("should revert when trying to purchase zero tokens", async () => {
        await expect(purchaseIGC.connect(buyer).buyTokens(await buyer.getAddress(), 0, { value: 0 }))
            .to.be.revertedWith("Must purchase at least one token");
    });


    it("should withdraw Ether only by the owner", async () => {
        const amount = 5;
        const totalCost = tokenPrice * BigInt(amount);
        
        // Buyer purchases tokens
        await purchaseIGC.connect(buyer).buyTokens(await buyer.getAddress(), amount, { value: totalCost });
        
        const initialBalance = await ethers.provider.getBalance(await owner.getAddress());

        // Owner withdraws funds
        await purchaseIGC.connect(owner).withdraw();

        const finalBalance = await ethers.provider.getBalance(await owner.getAddress());
        expect(finalBalance).to.be.gt(initialBalance);
    });
});
