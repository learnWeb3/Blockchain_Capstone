// Test if a new solution can be added for contract - SolnSquareVerifier

// Test if an ERC721 token can be minted for contract - SolnSquareVerifier

var SolnSquareVerifier = artifacts.require("SolnSquareVerifier");
const assert = require("assert");
const BigNumber = require("bignumber.js");
const proof = require("../../proof.json");

contract("SolnSquareVerifier", (accounts) => {
  const account_one = accounts[0];
  var contract;

  describe("Test verification", function () {
    it("should deploy the related contract", async function () {
      contract = await SolnSquareVerifier.new({ from: account_one });
    });
    it("should mint a token if proof is valid", async function () {
      await contract.mintToken(proof.proof, proof.inputs);
      const balance = await contract.balanceOf(account_one);
      assert.equal(new BigNumber(balance).isEqualTo(new BigNumber(1)), true);
    });

    it("should fail if proof is invalid", async function () {
      try {
        await contract.mintToken(proof.proof, [
          "0x0000000000000000000000000000000000000000000000000000000000000005",
          "0x0000000000000000000000000000000000000000000000000000000000000001",
        ]);
        assert.fail();
      } catch (error) {
        assert.equal(error.reason, "proof must be valid");
      }
    });
  });
});
