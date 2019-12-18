/*global chrome*/

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const app = document.createElement('div');
app.id = 'img-grabber'
app.classList.add('img-grabber')
app.style.display = "none";
document.body.appendChild(app);
ReactDOM.render( <App parentElement={app}/> , app);

chrome.runtime.onMessage.addListener(request => {
    if (request.type === 'grabAllPicktures') {
        toggleVisibility(app);
    }
})

export function toggleVisibility(node) {
    if (node.style.display === "none") {
        node.style.display = "block";
    } else {
        node.style.display = "none"
    }
}