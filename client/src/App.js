      import React, { Component } from "react";
      import ExpenseFactory from "./contracts/ExpenseFactory.json";
      import getWeb3 from "./getWeb3";
      import "./App.css";
      import { Header } from "./components/Header";
      import {Balance } from "./components/Balance";
      import { IncomeExpenses } from "./components/IncomeExpenses";
      import { TransactionList } from "./components/TransactionList";
      import { AddTransaction } from "./components/AddTransaction";
      import { SetIncome } from "./components/SetIncome";
      import { GlobalContext, GlobalProvider } from "./context/GlobalState";

      class App extends Component {

        state = { income: null, web3: null, accounts: null, contract: null, expenses : null };

        componentDidMount = async () => {
          try {
            // Get network provider and web3 instance.
            const web3 = await getWeb3();
            const Web3 = require('web3');
           // const web3 =  new Web3('http://localhost:7545')
           // const HDWalletProvider = require('@truffle/hdwallet-provider');

            /* const provider = new HDWalletProvider(
              deployerPrivateKey,
              'https://ropsten.infura.io/v3/447e523ed3bc4b0eadc8e017f07c7721'
            ); */
           // console.log(web3)
           // const contractAddress = '0xe5b77DA615eEcA99080173603859f92d9492ac81';
            const networkId = await web3.eth.net.getId();
            const deployedNetwork = ExpenseFactory.networks[networkId];
            let instance = new web3.eth.Contract(
            ExpenseFactory.abi, deployedNetwork.address
          );
         /*  instance  = await instance.deploy({
            data : ExpenseFactory.bytecode
          }).send({from : deployerAddress}); */
           

            // Use web3 to get the user's accounts.
            const accounts = await web3.eth.getAccounts();
            console.log(accounts)

            /* 
            for local network testing
            // Get the contract instance.
            const networkId = await web3.eth.net.getId();
            //console.log(networkId);
            const deployedNetwork = ExpenseFactory.networks[networkId];
            //console.log(deployedNetwork);
            const instance = new web3.eth.Contract(
              ExpenseFactory.abi,
              deployedNetwork && deployedNetwork.address
            ); */

            // Set web3, accounts, and contract to the state, and then proceed with an
            // example of interacting with the contract's methods.
            this.setState({ web3, accounts, contract: instance }, this.getExpensesList);
          } catch (error) {
            // Catch any errors for any of the above operations.
            alert(
              `Failed to load web3, accounts, or contract. Check console for details.`,
            );
            console.error(error);
          }
        };
        runExample = async () => {
          const { accounts, contract } = this.state;

          // Stores a given value, 5 by default.
          await contract.methods.setIncome(200).send({ from: '0x8f276d4285A7D7be981afC3a5E4B967c49a77cc1' });

          // Get the value from the contract to prove it worked.
          const response = await contract.methods.getIncome().call();

          // Update state with the result.
          this.setState({ income: response });
        };
        getData=()=>{
          //
          if(this.state.income !== null && this.state.web3!== null && this.state.accounts !==null &&this.state.contract !== null){
            return false
          }
          return true
        }
        setIncome = async (income)=>{
          console.log(income);
          const { accounts, contract } = this.state;
          await contract.methods.setIncome(income).send({ from: accounts[0] }).on('transactionHash', function(hash){
            console.log('set income trxID: '+ hash);
          });

          
          // Get the value from the contract to prove it worked.
          const response = await contract.methods.getIncome().call();

          // Update state with the result.
          this.setState({ income: response });
        }

        getIncome = async() =>{
          const { contract } = this.state;
              // Get the value from the contract to prove it worked.
              const response = await contract.methods.getIncome().call();

              // Update state with the result.
              this.setState({ income: response });
              console.log(response);
        }

        reloadPage = ()=>{
          window.location.reload()
        }

        getExpensesList = async () =>{
          const { contract } = this.state;
          const expenseList = await contract.methods.getExpenses().call();
           this.setState({expenses : expenseList});
         //this.expenses = {expenseList};
          // console.log(this.expenses);
         // expenseList.map((exp) => console.log(exp.purpose));
         //console.log(expenseList)
          this.getIncome();
        }

        addExpense = async (title, amount) =>{
          const {accounts, web3,contract } = this.state;
          const balance = await web3.eth.getBalance(accounts[0]);
          console.log('available balance :'+ balance);
          const res = await contract.methods.addTransaction(title, amount).send({ from: accounts[0], gas : 1000000})
          .on('transactionHash', function(hash){
            console.log('add expense trxID: '+ hash);
          });

          //alert(res);
          alert ('New expense has been added, reload page to update history');


    /*  contract.events.expenseAdded({}).on('data', event => console.log(event));
      await new Promise(resolve => setTimeout(()=> resolve),2000);
      await contract.methods.emitEvent(title, amount).send({
        from : accounts[0]
      }); */

        }

        render() {
          if (this.getData()) {
            return <div>Loading Web3, accounts, and contract...</div>;
          }
          return (
      /*       <div className="App">
              <h1>Good to Go!</h1>
              <p>Your Truffle Box is installed and ready.</p>
              <h2>Smart Contract Example</h2>
              <p>
                If your contracts compiled and migrated successfully, below will show
                a stored value of 5 (by default).
              </p>
              <p>
                Try changing the value stored on <strong>line 42</strong> of App.js.
              </p>
              <div>The stored value is: {this.state.income}</div>
            </div> */
            <GlobalProvider>
              <Header />
              <div className = "container">
                <SetIncome setIncome = {this.setIncome}/>
                <Balance expensesList = {this.state.expenses}/>
                <IncomeExpenses  income = { this.state.income} expensesList = {this.state.expenses}/>
                <TransactionList  expensesList = {this.state.expenses}/>
                <AddTransaction addExpense = {this.addExpense}/>
              </div>
            </GlobalProvider>
          );
        }
      }

      export default App;
