import ReactDOM from 'react-dom';
import './index.css';

import Home from "./pages/home/Home";
import Map from "./pages/Map/Map";

import {BrowserRouter, Route} from "react-router-dom";
import { createStore, Store } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from "./reducer";

export const store : Store = createStore(rootReducer);

ReactDOM.render(
        <BrowserRouter>
            <Provider store={store} >
                <Route path="/" exact component={Home}/>
                <Route path="/map" exact component={Map}/>
            </Provider>
        </BrowserRouter>
, document.getElementById('root')
);
