const assert = require("assert");
const { idText } = require("typescript");

const Dex = artifacts.require("Dex");

contract("Dex", () => {

    let dex;

    beforeEach(async () => {

        dex = await Dex.new();
        await dex.addToken("USDT", "0xdac17f958d2ee523a2206206994597c13d831ec7")
    });

    // it("Add tokens and contract address Success", async () => {

    //     const tokenInfo = await dex.getTokenContractAddress("USDT");

    //     assert(tokenInfo == "0xdac17f958d2ee523a2206206994597c13d831ec7");
    // })

    it("show Errro send Token", async () => {

        await dex
            .sendTokenWithSmartContractAddress(
                "USDT",
                "0xee61f5fb0db81d3a09392375ee96f723c0620e07",
                "0xdac17f958d2ee523a2206206994597c13d831ec7",
                1000)

    })



})