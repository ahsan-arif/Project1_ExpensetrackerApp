import React,{useState} from 'react'

export const SetIncome = ({setIncome}) => {
    const [amount, setAmount] = useState(0);
    const onSubmit = (e) =>{
      e.preventDefault();
      setIncome(amount);
    }
    return (
        <>
             <h3>Set income</h3>
             <form  onSubmit = {onSubmit}>
             <div className="form-control">
          <label htmlFor="amount"
            >Amount <br />
            (Your balance will be updated according to the income)</label
          >
          <input type="number"  value={amount} onChange={(e)=> setAmount(e.target.value)}
          placeholder="Enter amount..." />
        </div>
        <button className="btn">Set Income</button>
             </form>
        </>
    )
}
