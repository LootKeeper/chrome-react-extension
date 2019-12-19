/*global chrome*/

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

var app;

chrome.runtime.onMessage.addListener(request => {

    if(!app){
        createApp();
    }

    if (request.type === 'open-img-grabber') {
        toggleVisibility(app);
    }
})

function createApp(){
    app = document.createElement('div');
    app.id = 'img-grabber'
    app.classList.add('img-grabber')
    app.style.display = "none";
    document.body.appendChild(app);
    ReactDOM.render(<App parentElement={app}/> , app);
}

export function toggleVisibility(node) {
    if (node.style.display === "none") {
        node.style.display = "block";
    } else {
        node.style.display = "none"
    }
}