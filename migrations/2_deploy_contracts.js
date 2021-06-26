var ExpenseFactory = artifacts.require("./expenseFactory.sol");

module.exports = async function(deployer, network, accounts) {
  await deployer.deploy(ExpenseFactory);

  const expenseFactory = await ExpenseFactory.deployed()
};
