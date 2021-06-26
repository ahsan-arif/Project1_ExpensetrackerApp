// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.7.0;
pragma experimental ABIEncoderV2;

contract ExpenseFactory {
  uint32 income ; 
  struct expense{
    address account;
    string purpose;
    int amount;
  }
  expense[] public expenses;

  //mapping (address=>expense) expenses;
  //address[] public userAddresses;
  event incomeUpdated(uint32 income);
  event expenseAdded (string _purpose, int _amount);

  function setIncome(uint32 _income) external{
    income = _income;
    emit incomeUpdated(income);
  }

  function addTransaction(string calldata _purpose, int _amount) external{
    expenses.push(expense(msg.sender, _purpose, _amount));
    //expenses[msg.sender] = expense(_purpose, _amount);
   // userAddresses.push(msg.sender)-1;
    //expenses.push(expense(_purpose, _amount)); 
    emit expenseAdded(_purpose , _amount);
  }

function getIncome() public view returns(uint32) {
return income;
}

/* function getExpenses() public view returns(string[] memory, uint16[] memory){
  //expense[] memory expensesCopy  =  new expense[](expenses.length);
  string [] memory  purposeArray = new string[](expenses.length);
  uint16 [] memory amountArray = new uint16[](expenses.length);

  for (uint index = 0; index < expenses.length; index++) {
    expense memory e = expenses[index];
    purposeArray[index] = e.purpose;
    amountArray[index] = e.amount;
  }
  return (purposeArray,amountArray);
} */

function getExpenses () public view returns(expense [] memory){
/* expense [] memory expensesCopy = new expense[] (expenses.length);
for (int index = 0; index < expenses.length; index++) {

  expensesCopy[index] = expenses[index];
} */
//expensesCopy = expenses;
return expenses;
}

}
