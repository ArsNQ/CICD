import React, {useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import './register_styles.css'
import {Link, Redirect} from "react-router-dom";
import {register} from "../../actions/auth";
import {Button, ButtonToolbar, ControlLabel, Form, FormGroup, Icon, Input, Nav} from "rsuite";
import UserLoginLogo from "../../assets/icon/user.svg";

export default function Register() {
    const {isAuth} = useSelector(store => store.user);
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [firstname, setfirstname] = useState("");
    const [lastname, setlastname] = useState("");
    const [value, setValue] = React.useState("A0");
    const [level] = React.useState([
        { label: "A0 - Preschool", value: "A0" },
        { label: "A1 - Starter", value: "A1-" },
        { label: "A1 - Beginner", value: "A1" },
        { label: "A2 - Elementary", value: "A2"},
        { label: "B1 - Intermediate", value: "B1"},
        { label: "B2 - Upper-Intermediate", value: "B2"},
        { label: "C1 - Advanced", value: "C1"}
    ]);
    const dispatch = useDispatch();

    if (isAuth) {
        return <Redirect to={'/dashboard'} />
    }

    const submitRegister = () => {
        if (email && password && firstname && lastname) {
            register(email, password, firstname, lastname, value)(dispatch)
                .catch((e)=> console.log(e))
        }
    }

    return (
        <div>
            <div className="wrapper fadeInDown">
                <div id="formContent">
                    <div className="fadeIn first">
                        <img src={UserLoginLogo} className="icon-login-user" id="icon" alt="User Icon"/>
                    </div>
                    <Form>
                        <FormGroup>
                            <Input value={email} placeholder="example@example.com" className="fadeIn second input-login input-login-button" onChange={e => setemail(e)} name="email" type="email" />
                        </FormGroup>
                        <FormGroup>
                            <Input type="password" value={password} onChange={e => setpassword(e)} id="password" className="fadeIn second input-login input-login-button" name="login" placeholder="password"/>
                        </FormGroup>
                        <br/>
                        <FormGroup>
                            <Input value={lastname} onChange={e => setlastname(e)} className="fadeIn third input-login input-login-button" placeholder="Lastname" name="lastname" type="string" />
                        </FormGroup>
                        <FormGroup>
                            <Input value={firstname} onChange={e => setfirstname(e)} className="fadeIn third input-login input-login-button" placeholder="Firstname" name="firstname" type="string" />
                        </FormGroup>
                        <FormGroup>
                            <ButtonToolbar>
                                <input type="button" onClick={() => submitRegister()} className="fadeIn fourth input-login-button" value="Register"/>
                            </ButtonToolbar>
                        </FormGroup>
                    </Form>
                    <div id="formFooter">
                        <a className="underlineHover" href="/login">You already have account</a>
                    </div>
                </div>
            </div>
        </div>
    );
}
