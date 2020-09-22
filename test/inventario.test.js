const { expect } = require("chai");

describe("Inventario", function() {
  it("Should not withdraw before expiration", async function() {
    const Inventario = await ethers.getContractFactory("Inventario");
    const invetario = await Inventario.deploy('0xc783df8a850f42e7f7e57013759c285caa701eb6');
    
    await invetario.deployed();
    await expect(invetario.saque(10000000)).to.be.revertedWith('nao chegou a hora!');
  });
  it("Should not withdraw if you are not the herdeiro", async function() {
    const Inventario = await ethers.getContractFactory("Inventario");
    const invetario = await Inventario.deploy('0xead9c93b79ae7c1591b1fb5323bd777e86e150d4');
    
    await invetario.deployed();
    await expect(invetario.saque(10000000)).to.be.revertedWith('vc nao eh o herdeiro');
  });
  it("Should not withdraw if amount higher than avaiable", async function() {
    const Inventario = await ethers.getContractFactory("Inventario");
    const inventario = await Inventario.deploy('0xc783df8a850f42e7f7e57013759c285caa701eb6');
    
    await inventario.deployed();

    // force expiration
    const expirableTimestamp = (await inventario.dataDeRetirada()).toNumber()
    await ethers.provider.send('evm_setNextBlockTimestamp', [expirableTimestamp])
    await ethers.provider.send('evm_mine')

    await expect(inventario.saque(10000000)).to.be.revertedWith('vc esta pedindo mais do que disponivel');
  });
  it("Should withdraw after time has passed", async function() {
    const Inventario = await ethers.getContractFactory("Inventario");
    const inventario = await Inventario.deploy('0xc783df8a850f42e7f7e57013759c285caa701eb6');
    
    await inventario.deployed();

    await inventario.adicionarFundos({ value: (1e18).toString()})
    // force expiration
    const expirableTimestamp = (await inventario.dataDeRetirada()).toNumber()
    await ethers.provider.send('evm_setNextBlockTimestamp', [expirableTimestamp])
    await ethers.provider.send('evm_mine')

    await inventario.saque(1);
  });
});
