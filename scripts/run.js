const main = async () => {
  // The first return is the deployer and second is a random account.
  const [owner, randomPerson] = await hre.ethers.getSigners();
  const domainContractFactory = await hre.ethers.getContractFactory('SaveSoilNameService');
  // Passing the extension that we want for our domains, simply TLD.
  const domainContract = await domainContractFactory.deploy("savesoil");
  await domainContract.deployed();
  console.log("Contract deployed to:", domainContract.address);

  // Passing in the second variable - value. This is the fees(Cost + Gas) that the user has to pay.
  let txn = await domainContract.register("srinivasan", {value: hre.ethers.utils.parseEther('0.1')});
  await txn.wait();

  const domainOwner = await domainContract.getAddress("srinivasan");
  console.log(`Owner of domain srinivasan is ${domainOwner}`);

  // Fetching the balance of our contract
  const balance = await hre.ethers.provider.getBalance(domainContract.address);
  console.log(`Contract balance: ${hre.ethers.utils.formatEther(balance)}`);

  try {
    txn = await domainContract.connect(randomPerson).withdraw();
    await txn.wait();
  }catch(error){
    console.log("Cannot rob the contract");
  }

  let ownerBalance = await hre.ethers.provider.getBalance(owner.address)
  console.log(`Balance of Owner before withdrawal is: ${hre.ethers.utils.formatEther(ownerBalance)}`);


  txn = await domainContract.connect(owner).withdraw();
  await txn.wait();

  // try{
  //   txn = await domainContract.connect(owner).withdraw();
  //   await txn.wait();
  // }catch(e){
  //   console.log("Errorrrr")
  // }

  // Fetching the balance of contract and owner
  const contractBalance = await hre.ethers.provider.getBalance(domainContract.address);
  ownerBalance = await hre.ethers.provider.getBalance(owner.address);

  console.log(`Contract balance after withdrawal: ${hre.ethers.utils.formatEther(contractBalance)}`);
  console.log(`Contract balance after withdrawal: ${hre.ethers.utils.formatEther(ownerBalance)}`);

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