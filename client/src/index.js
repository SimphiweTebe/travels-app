import React from 'react';
import {render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import App from './App';
import mainReducer from './redux/reducers';
import './styles/global.scss';

const Store = createStore(mainReducer, applyMiddleware(thunk));

render(<Provider store={Store}><App /></Provider>, document.getElementById('root'));