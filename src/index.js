import React from 'react';
import {Provider} from "react-redux"
import ReactDOM from 'react-dom/client';
import { MyContext } from './Event-Spot/client/ContextApi/Context';

import App from './App';
import configureStore from './Event-Spot/client/store/configureStore';
import { BrowserRouter } from 'react-router-dom';
import { startGetEvents } from './Event-Spot/client/react-redux/action/eventAction';

const store = configureStore()
console.log('state',store.getState())
store.subscribe(()=>{
    console.log('state updated', store.getState())
})

store.dispatch(startGetEvents())

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
    <Provider store={store}>

        <App />
    </Provider> 
    </BrowserRouter>
);


