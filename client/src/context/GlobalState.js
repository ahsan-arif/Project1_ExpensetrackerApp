import React, {createContext, useReducer} from 'react';
import AppReducer from './AppReducer';

const initialState = { expenses : [
    {account : '0x123567333', purpose : 'some purpose', amount : 150}
]};

export const GlobalContext = createContext(initialState);

//Provider Component
export const GlobalProvider = ( {children} ) => {
    const[state, dispatch] = useReducer(AppReducer, initialState);

    function getExpenses(expenses){
        dispatch( {
            type : 'GET_EXPENSES',
            payload : expenses
        } );
    }

    return(<GlobalContext.Provider value = {{
        expenses : state.expenses,
        getExpenses
    }} >
        {children}
        </GlobalContext.Provider>);
}