// react 
import React from 'react';
// react-dom
import ReactDom from 'react-dom';

import 'font-awesome/css/font-awesome.min.css'
import './index.css'
import './index.scss'

// render router
ReactDom.render(
    <div>
        <i className="fa fa-address-book"></i>
        <h1>hello world!</h1>,
    </div>,
    document.getElementById('app')
);
