const CpayCoin = artifacts.require("CpayCoin");

module.exports = function (deployer) {
  deployer.deploy(CpayCoin,"0xeDAc8F3681e866702032c0b1d3f39904Ef9eb17E",
  "CPAY",
  "CPY",
  1000000000000000);
};
