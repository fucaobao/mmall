// react 
import React from 'react';
// react-dom
import ReactDom from 'react-dom';

import './index.scss'
let name = 'wangjp'
let names = ['wangjp', 'fuyy', 'liaowy']
let style = {
    // color: 'red',
    // 'fontSize': '18px'
}
let jsx = (<div className="jsx" style={style}>
            {/*条件判断*/}
            {
                Math.random() > 0.5 ? <p>I am wangjp</p> : <p>I am not wangjp</p>
            }
            {/*数组循环*/}
            {
                names.map((name,index) => 
                    <p key={index}>I am {name}</p>
                )
            }
          </div>)

ReactDom.render(
    jsx,
    document.getElementById('app')
)