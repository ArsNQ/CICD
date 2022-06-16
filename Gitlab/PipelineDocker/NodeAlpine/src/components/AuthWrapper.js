import React from 'react';
import {useSelector} from "react-redux";
import {Redirect} from "react-router-dom";
import Cookies from "universal-cookie";
const cookies = new Cookies();

const AuthWrapper = ({children}) => {
    const store = useSelector(store => store);
    console.log(store);
    if (!store.user.isAuth) {
        return <Redirect to={'/login'}/>
    }
    return (children);
};

export default AuthWrapper;
