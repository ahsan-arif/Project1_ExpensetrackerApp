import React from 'react'

export const Balance = ( {expensesList} ) => {
    let amounts =0;
    let total =0;
    if(expensesList !== undefined && expensesList!==null){
        amounts  = expensesList.map(expense => new Number(expense.amount) ) ;
        total = amounts.reduce( (acc, item) => (acc += item),0 );
    }

    return (
        <>
        <h4>Your Balance</h4>
        <h1 id = 'balance'>$ {total}</h1>
    </>
    )
}
