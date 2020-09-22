
async function main() {

  const Inventario = await ethers.getContractFactory("Inventario");
  const invetario = await Inventario.deploy('0xc783df8a850f42e7f7e57013759c285caa701eb6');

  await invetario.deployed();

  console.log("Foi deployado em: ", invetario.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
