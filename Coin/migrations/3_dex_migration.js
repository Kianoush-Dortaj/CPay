
const dex = artifacts.require("Dex");

module.exports =async function (deployer) {

    deployer.deploy(dex);

}