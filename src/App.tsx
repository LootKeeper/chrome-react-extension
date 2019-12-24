/*global chrome*/

import * as React from 'react';
import Frame from 'react-frame-component';
import './App.css';
import ImgGrabber from './components/imgGrabber/imgGrabber';
import rootReducer from './redux/reducers/reducer';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export interface IAppProps {
    parentElement: HTMLDivElement
}

const App = (props: IAppProps) =>
    <Frame style={{ border: 'none', width: '100%', height: '100%', display: 'unset' }} head={[<link type="text/css" rel="stylesheet" href={chrome.runtime.getURL("bundle.css")} ></link>]}>
        <Provider store={store}>
            <ImgGrabber parentElement={props.parentElement} />
        </Provider>
    </Frame>

export default App;