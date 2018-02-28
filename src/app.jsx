// react
import React from 'react'
// react-dom
import ReactDom from 'react-dom'

import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom'

import Home from 'page/home/index.jsx'
import Product from 'page/product/index.jsx'
import Category from 'page/product/category/index.jsx'
import Order from 'page/order/index.jsx'
import User from 'page/user/index.jsx'
import Login from 'page/login/index.jsx'
import ErrorPage from 'page/error/index.jsx'

import Layout from 'components/layout/index.jsx'

class App extends React.Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/login" component={Login} />
                    <Route path="/" render={props => (
                        <Layout>
                            <Switch>
                                <Route exact path="/" component={Home} />
                                <Route path="/product" component={Product} />
                                <Route path="/product-category" component={Category} />
                                <Route path="/order" component={Order} />
                                <Route path="/user" component={User} />
                                <Route component={ErrorPage} />
                            </Switch>
                        </Layout>
                    )} />
                </Switch>
            </Router>
        )
    }
}

ReactDom.render(
    <App />,
    document.getElementById('app')
)