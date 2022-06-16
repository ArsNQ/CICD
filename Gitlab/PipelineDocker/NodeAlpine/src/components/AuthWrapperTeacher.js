import React from 'react';
import {useSelector} from "react-redux";
import {Redirect} from "react-router-dom";
import Cookies from "universal-cookie";
const cookies = new Cookies();

const AuthWrapperTeacher = ({children}) => {
    const store = useSelector(store => store);
    if (!cookies.get('sess')) {
        return <Redirect to={'/login'}/>
    }
    else if (store.user.user.accountType === "Teacher") {
        return (children);
    }
    else {
        return <Redirect to={"/dashboard"}/>
    }
};

export default AuthWrapperTeacher;
