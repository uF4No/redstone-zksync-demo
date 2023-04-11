import { expect } from "chai";
import { Wallet, Provider, Contract } from "zksync-web3";
import * as hre from "hardhat";
import { Deployer } from "@matterlabs/hardhat-zksync-deploy";
import { ethers } from "ethers";
import { WrapperBuilder } from "@redstone-finance/evm-connector";

const RICH_WALLET_PK =
  "0x7726827caac94a7f9e1b160f7ea819f172f7b6f9d2a97f992c38edeab82d4110";

async function deployContract(deployer: Deployer): Promise<Contract> {
  // const artifact = await deployer.loadArtifact("PriceChecker");
  const artifact = await deployer.loadArtifact("RapidExample");

  return await deployer.deploy(artifact);
}

describe("PriceChecker", function () {
  it("Should return the ETH price", async function () {
    const provider = Provider.getDefaultProvider();

    const wallet = new Wallet(RICH_WALLET_PK, provider);
    const deployer = new Deployer(hre, wallet);

    const PriceChecker = await deployContract(deployer);

    const wrapped = WrapperBuilder.wrap(PriceChecker).usingDataService(
      {
        dataServiceId: "redstone-main-demo",
        uniqueSignersCount: 1,
        dataFeeds: ["ETH"],
      },
      ["https://d33trozg86ya9x.cloudfront.net"]
    );

    console.log("wrapped :>> ", wrapped);

    expect(await wrapped.getLatestEthPrice({ gasLimit: 200000 })).to.not.eq("");
  });
});
