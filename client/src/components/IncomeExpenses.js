import React from 'react'

export const IncomeExpenses = ({income,expensesList}) => {
  let expense = 0;
  if(expensesList !== undefined && expensesList !== null && expensesList.length !== 0){
    const amounts = expensesList.map(expense => new Number(expense.amount));
    //const total = amounts.reduce((acc, item) => (acc +=item), 0);
  
   /*  income = amounts
    .filter(item => item>0)
    .reduce((acc, item) => (acc +=item), 0); */
  
    expense = amounts.filter(item => item<0).reduce((acc,item) => (acc+=item),0)*-1;
  }
 
    return (
        <div className="inc-exp-container">
        <div>
          <h4>Income</h4>
          <p id="money-plus" className="money plus">${income}</p>
        </div>
        <div>
          <h4>Expense</h4>
          <p id="money-minus" className="money minus">-${expense}</p>
        </div>
      </div>
    )
}
