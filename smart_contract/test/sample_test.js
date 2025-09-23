const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Transactions", function () {
  let transactions;
  let owner, addr1, addr2;

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();
    
    const Transactions = await ethers.getContractFactory("Transactions");
    transactions = await Transactions.deploy();
    await transactions.waitForDeployment();
  });

  it("Should start with zero transaction count", async function () {
    expect(await transactions.getTransactionCount()).to.equal(0);
  });

  it("Should add transaction to blockchain", async function () {
    const tx = await transactions.addToBlockChain(
      addr1.address,
      ethers.parseEther("1.0"),
      "Test message",
      "test"
    );
    
    await tx.wait();
    
    expect(await transactions.getTransactionCount()).to.equal(1);
    
    const allTransactions = await transactions.getAllTransactions();
    expect(allTransactions.length).to.equal(1);
    expect(allTransactions[0].sender).to.equal(owner.address);
    expect(allTransactions[0].receiver).to.equal(addr1.address);
    expect(allTransactions[0].message).to.equal("Test message");
    expect(allTransactions[0].keyword).to.equal("test");
  });

  it("Should reject invalid receiver address", async function () {
    await expect(
      transactions.addToBlockChain(
        ethers.ZeroAddress,
        ethers.parseEther("1.0"),
        "Test message",
        "test"
      )
    ).to.be.revertedWith("Invalid receiver address");
  });

  it("Should reject zero amount", async function () {
    await expect(
      transactions.addToBlockChain(
        addr1.address,
        0,
        "Test message",
        "test"
      )
    ).to.be.revertedWith("Amount must be greater than 0");
  });
});