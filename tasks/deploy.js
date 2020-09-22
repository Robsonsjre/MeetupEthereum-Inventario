task('deployInventario', 'Deployar um novo inventario')
  .addParam('herdeiro', 'herdeiro que podera sacar')
  .setAction(async ({ herdeiro }, bre) => {
 
    const Inventario = await ethers.getContractFactory('Inventario')
    const invetario = await Inventario.deploy(herdeiro);

    await invetario.deployed();
  
    console.log("Foi deployado em: ", invetario.address);
  })
