import React, {useEffect, useState} from 'react';
import './App.css';
import {useDispatch} from "react-redux";
import {auth} from "./actions/auth";
import {Route, Switch, Redirect} from 'react-router-dom';
import Cookies from 'universal-cookie';
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Dashboard from "./pages/dashboard/Dashboard";
import Feedback from "./pages/feedback/Feedbacks";
import Schedule from "./pages/schedule/Schedule";
import AuthWrapper from "./components/AuthWrapper";
import Profile from "./pages/profile/Profile";
import Navbar from "./components/Header/Navbar";
import Home from "./pages/home/home";
import AuthWrapperTeacher from "./components/AuthWrapperTeacher";
import Loader from "react-loader-spinner";

const cookies = new Cookies();

function App() {
    const dispatch = useDispatch();
    const [authState, setAuthState] = useState(false);
    const [checkAuth, setcheckAuth] = useState(false);
    const [loading, setLoading] = useState(cookies.get('sess'));

    useEffect(() => {
        if (cookies.get('sess')) {
            auth()(dispatch)
                .then(({isAuth}) => setTimeout(() => {
                    setLoading(false);
                }, 1000));
        }

    }, [dispatch]);


    if (!loading) {
        return (
            <>
                <Navbar/>
                <Switch>
                    <Route exact path="/">
                        <Redirect to="/home"/>
                    </Route>
                    <Route exact path="/home" component={(props) => <Home {...props}/>}/>
                    <Route exact path="/schedule" component={(props) => <AuthWrapper><Schedule {...props}/></AuthWrapper>}/>
                    <Route exact path="/feedbacks" component={(props) => <AuthWrapperTeacher><Feedback {...props}/></AuthWrapperTeacher>}/>
                    <Route exact path="/dashboard" component={(props) => <AuthWrapper><Dashboard {...props}/></AuthWrapper>}/>
                    <Route exact path="/login" component={(props) => <Login {...props}/>}/>
                    <Route exact path="/register" component={(props) => <Register {...props}/>}/>
                    <Route path="/profile" component={(props) => <AuthWrapper><Profile {...props}/></AuthWrapper>}/>
                </Switch>
            </>
        );
    } else {
        return (
            <div style={{
                height: '100vh',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Loader
                    style={{position: 'absolute'}}
                    type="TailSpin"
                    color="#5d9cec"
                    height={300}
                    width={300}
                />
            </div>
        );
    }
}

export default App;
