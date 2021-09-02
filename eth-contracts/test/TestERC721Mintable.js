var CustomERC721Token = artifacts.require("CustomERC721Token");
const assert = require("assert");
const BigNumber = require("bignumber.js");

contract("TestERC721Mintable", (accounts) => {
  const account_one = accounts[0];
  const account_two = accounts[1];

  describe("match erc721 spec", function () {
    beforeEach(async function () {
      this.contract = await CustomERC721Token.new({ from: account_one });
      // TODO: mint multiple tokens
      await this.contract.mint(account_one, 1);
      await this.contract.mint(account_two, 2);
    });

    it("should return total supply", async function () {
      const totalSupply = await this.contract.totalSupply();
      assert.equal(
        new BigNumber(totalSupply).isEqualTo(new BigNumber(2)),
        true
      );
    });

    it("should get token balance", async function () {
      const balance_account_one = await this.contract.balanceOf(account_one);
      const balance_account_two = await this.contract.balanceOf(account_two);
      assert.equal(
        new BigNumber(balance_account_one).isEqualTo(new BigNumber(1)),
        true
      );
      assert.equal(
        new BigNumber(balance_account_two).isEqualTo(new BigNumber(1)),
        true
      );
    });

    // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
    it("should return token uri", async function () {
      const token_uri_account_one = await this.contract.tokenURI(1, {
        from: account_one,
      });
      const token_uri_account_two = await this.contract.tokenURI(1, {
        from: account_two,
      });
      assert.equal(
        token_uri_account_one,
        "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1"
      );
      assert.equal(
        token_uri_account_two,
        "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1"
      );
    });

    it("should transfer token from one owner to another", async function () {
      await this.contract.transferFrom(account_one, account_two, 1);
      const balance_account_one = await this.contract.balanceOf(account_one);
      const balance_account_two = await this.contract.balanceOf(account_two);
      assert.equal(
        new BigNumber(balance_account_one).isEqualTo(new BigNumber(0)),
        true
      );
      assert.equal(
        new BigNumber(balance_account_two).isEqualTo(new BigNumber(2)),
        true
      );
      const eventLogs = await this.contract.getPastEvents("Transfer", {
        fromBlock: 0,
        filter: { from: account_one, to: account_two, tokenId: 1 },
      });
      assert.equal(eventLogs.length, 1);
    });
  });

  describe("have ownership properties", function () {
    beforeEach(async function () {
      this.contract = await CustomERC721Token.new({ from: account_one });
    });

    it("should fail when minting when address is not contract owner", async function () {
      try {
        await this.contract.mint(account_one, 1, { from: account_two });
        assert.fail();
      } catch (error) {
        assert.equal(error.reason, "caller must be owner");
      }
    });

    it("should return contract owner", async function () {
      const contract_owner = await this.contract.getOwner();
      assert.equal(contract_owner, account_one);
    });
  });
});
