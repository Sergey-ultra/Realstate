import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import store from './store/redux-store';
import {Provider} from "react-redux";




// Importing SCSS files
import './WarningModal.scss';
import './Modal.scss';
import './DetailsModal.scss';




ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root'));

