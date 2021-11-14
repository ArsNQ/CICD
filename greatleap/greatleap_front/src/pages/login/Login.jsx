import React, { useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {Form, FormGroup, FormControl, ControlLabel, Button, ButtonToolbar} from 'rsuite';
import {Nav, Icon, Input} from 'rsuite';
import {Link, Redirect} from "react-router-dom";
import {login} from "../../actions/auth";
import UserLoginLogo from '../../assets/icon/user.svg';
import './login_styles.css'

export default function Login() {
    const {isAuth} = useSelector(store => store.user);
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const dispatch = useDispatch();

    const submitLogin = () => {
        if (email && password) {
            login(email, password)(dispatch)
                .catch((e)=> console.log(e))
        }
    }

    if (isAuth) {
        return <Redirect to={'/dashboard'} />
    }

    return (
        <div>
            <div className="wrapper fadeInDown">
                <div id="formContent">
                    <div className="fadeIn first">
                        <img src={UserLoginLogo} className="icon-login-user" id="icon" alt="User Icon"/>
                    </div>
                    <form>
                        <FormGroup>
                            <Input type="string" className="fadeIn second input-login input-login-button" name="login" placeholder="example@example.com" autoComplete="off" value={email} onChange={e => setemail(e)}/>
                        </FormGroup>
                        <FormGroup>
                            <Input type="password" value={password} onChange={e => setpassword(e)} id="password" className="fadeIn third input-login input-login-button" name="login" placeholder="password"/>
                        </FormGroup>
                        <FormGroup>
                            <input type="button" onClick={() => submitLogin()} className="fadeIn fourth input-login-button" value="Log In"/>
                        </FormGroup>
                    </form>
                    <div id="formFooter">
                        <a className="underlineHover" href="#">Forgot Password?</a>
                    </div>

                </div>
            </div>
        </div>
    );
}

