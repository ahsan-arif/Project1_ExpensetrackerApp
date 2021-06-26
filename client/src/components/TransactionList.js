import React, {useContext} from 'react'

import { GlobalContext } from '../context/GlobalState'

export const TransactionList = ( {expensesList} ) => {
  console.log(expensesList)
  if(expensesList){
    return(
      <>
      <h3>History</h3>
        <ul className="list">
  
            {expensesList.map((list,index)=>{
                return(
                  <li key={index} className={list.amount>=0 ? 'plus' : 'minus' } >
                  {list.purpose} <span>{`$${list.amount}`}</span><button className="delete-btn">x</button>
                </li> 
                )
              })}
        </ul>
          </>
    )
  }
  else{
    return(
      <>
      <h3>History</h3>
      <p>No Transaction Found</p>
      </>
    )
  }
}

