const main = async () => {
  // The first return is the deployer and second is a random account.
  const [owner, randomPerson] = await hre.ethers.getSigners();
  const domainContractFactory = await hre.ethers.getContractFactory('Domains');
  const domainContract = await domainContractFactory.deploy();
  await domainContract.deployed();
  console.log("Contract deployed to:", domainContract.address);
  console.log("Contract deployed by:", owner.address);

  let txn = await domainContract.register("savesoil");
  await txn.wait();

  const domainOwner = await domainContract.getAddress("savesoil");
  console.log(`Owner of ${txn} is ${domainOwner}`);

  // Try to set records for a domain that I don't own
  // txn = await domainContract.connect(randomPerson).setRecord("savesoil", "Ha Ha this is my domain now!")
  // await txn.wait()

};

const runMain = async () => {
  // Try and Catch only works with Runtime errors and will not work if the code is incorrect or gives a ParseError.
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();