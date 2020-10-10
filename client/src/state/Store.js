import React,{useReducer} from "react";
import {initialAuthState, authReducer} from './auth/authReducer';

export const AuthContext = React.createContext();

function Store(props){
    const [auth,dispatch] = useReducer(authReducer,initialAuthState);
    return <AuthContext.Provider value={{state:auth,dispatch}}>
        {props.children}
    </AuthContext.Provider>
}
export default Store;