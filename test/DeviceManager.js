/* global artifacts, assert, contract */

const DeviceManager = artifacts.require('./DeviceManager.sol');

const fixture = {};

contract('DeviceManager', (accounts) => {
  let contract;
  let web3;

  before(async () => {
    contract = await Lava.deployed();
    web3 = contract.constructor.web3;

    fixture.balance = await new Promise((resolve, reject) => {
      web3.eth.getBalance(accounts[0], (error, value) => {
        return resolve(value.toNumber());
      });
    });

    return Promise.resolve();
  });

  describe('deploy', () => {
    it('parameters are correct', async () => {
      const owner = await contract.owner();

      assert.equal(owner, accounts[0]);

      return Promise.resolve();
    });

    it('should fail trying to send eth directly to contract', async () => {
      let error;

      try {
        await web3.eth.sendTransaction({
          from: accounts[0],
          to: contract.address,
          value: fixture.minimumBalance,
        });
      } catch (err) {
        error = err;
      }

      assert.ok(error);

      return Promise.resolve();
    });
  });

});
