import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {applyMiddleware, createStore} from "redux";
import {BrowserRouter} from 'react-router-dom';
import thunk from "redux-thunk";
import rootReducer from './reducer';
import './index.css';
import App from './App';
import Navbar from "./components/Header/Navbar";

const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);
