// react
import React from 'react'
// react-dom
import ReactDom from 'react-dom'

import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom'

import Home from 'page/home/index.jsx'
import ProductRouter from 'page/product/router.jsx'
import Category from 'page/product/category/index.jsx'
import Order from 'page/order/index.jsx'
import UserList from 'page/user/index.jsx'
import Login from 'page/login/index.jsx'
import ErrorPage from 'page/error/index.jsx'

import Layout from 'components/layout/index.jsx'

class App extends React.Component {
    render() {
        const LayoutRouter = (
            <Layout>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/product" component={ProductRouter} />
                    <Route path="/product-category" component={Category} />
                    <Route path="/order" component={Order} />
                    <Route path="/user/index" component={UserList} />
                    <Redirect exact from="/user" to="/user/index" />
                    <Route component={ErrorPage} />
                </Switch>
            </Layout>
        )
        return (
            <Router>
                <Switch>
                    <Route exact path="/login" component={Login} />
                    <Route path="/" render={props => (
                        LayoutRouter
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