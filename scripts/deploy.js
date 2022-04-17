const main = async () => {
    const domainContractFactory = await hre.ethers.getContractFactory('SaveSoilNameService');
    const domainContract = await domainContractFactory.deploy("savesoil");
    await domainContract.deployed();
  
    console.log("Contract deployed to:", domainContract.address);
  
    // CHANGE THIS DOMAIN TO SOMETHING ELSE! I don't want to see OpenSea full of bananas lol
    let txn = await domainContract.register("campaign",  {value: hre.ethers.utils.parseEther('0.1')});
    await txn.wait();
    console.log("Minted domain campaign.savesoil");
  
    txn = await domainContract.setRecord("campaign", "An on going campaign to make people aware about the poor condition of our soil");
    await txn.wait();
    console.log("Set record for campaign.savesoil");
  
    const address = await domainContract.getAddress("campaign");
    console.log("Owner of domain campaign:", address);
  
    const balance = await hre.ethers.provider.getBalance(domainContract.address);
    console.log("Contract balance:", hre.ethers.utils.formatEther(balance));
  }
  
  const runMain = async () => {
    try {
      await main();
      process.exit(0);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  };
  
  runMain();