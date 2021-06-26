import React,{useEffect,useState} from 'react'
import ExpenseFactory from "./contracts/ExpenseFactory.json";
//import getWeb3 from "./getWeb3";
import "./App.css";
import { Header } from "./components/Header";
import {Balance } from "./components/Balance";
import { IncomeExpenses } from "./components/IncomeExpenses";
import { TransactionList } from "./components/TransactionList";
import { AddTransaction } from "./components/AddTransaction";
import { SetIncome } from "./components/SetIncome";
import { GlobalContext, GlobalProvider } from "./context/GlobalState";

const App = () =>{    // FIRST TIME RENDER 
    useEffect(async()=>{
        const Web3 = require('web3');
        const web3 =  new Web3('http://localhost:7545')

        // Use web3 to get the user's accounts.
        const accounts = await web3.eth.getAccounts();

        // Get the contract instance.
        const networkId = await web3.eth.net.getId();
        //console.log(networkId);
        const deployedNetwork = ExpenseFactory.networks[networkId];
        //console.log(deployedNetwork);
        const instance = new web3.eth.Contract(
          ExpenseFactory.abi,
          deployedNetwork && deployedNetwork.address
        );

        console.log({ web3, accounts, contract: instance })
    })

    return(
        <>
        <h3>Testing</h3>
        </>
    )
}

export default App