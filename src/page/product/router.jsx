// react
import React from 'react'
// react-dom
import ReactDom from 'react-dom'

import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom'

import ProductList from 'page/product/index/index.jsx'

class ProductRouter extends React.Component {
    render() {
        return (
            <Switch>
                <Route path="/product/index" component={ProductList} />
                <Redirect exact from="/product" to="/product/index"/>
            </Switch>
        )
    }
}

ReactDom.render(
    <ProductRouter />,
    document.getElementById('app')
)