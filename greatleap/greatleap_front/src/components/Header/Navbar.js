import './Navbar.css'
import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import LogoutLogo from '../../assets/icon/logout.svg';
import {logout} from "../../actions/auth";
import {Link, useHistory} from "react-router-dom";

export default function Navbar() {
    const {isAuth} = useSelector(store => store.user);
    const store = useSelector(store => store.user.user);
    const dispatch = useDispatch();
    const history = useHistory();

    const isTeacher = () => {
        if (store.accountType === "Teacher") {
            return true;
        } else {
            return false;
        }
    }

    const logoutUser = () => {
        logout()(dispatch).then(() => {
            history.push("/home");
        });
    }

    return (
        <div>
            <div className="nav">

                <Link style={{textDecoration: 'none'}} className="slam-left navbar-item" to={'/home'}>
                    EnglishPlatform
                </Link>

                {isAuth && <Link style={{textDecoration: 'none'}} className="navbar-item" to={'/schedule'}>
                    Schedule
                </Link>}

                {isTeacher() && <Link style={{textDecoration: 'none'}} className="navbar-item" to={'/feedbacks'}>
                    Feedbacks
                </Link>}

                {isAuth && <Link style={{textDecoration: 'none'}} className="navbar-item" to={'/dashboard'}>
                    Dashboard
                </Link>}

                {isAuth && <Link style={{textDecoration: 'none'}} className="navbar-item" to={'/profile'}>
                    Profile
                </Link>}

                {isAuth && <img onClick={() => logoutUser()} className="icon navbar-item"
                                src={LogoutLogo}/>}

                {!isAuth && <Link style={{textDecoration: 'none'}} className="navbar-item" to={'/login'}>
                    Login
                </Link>}

                {!isAuth && <Link style={{textDecoration: 'none'}} className="navbar-item" to={'/register'}>
                    Register
                </Link>}
            </div>
        </div>

    );
}
