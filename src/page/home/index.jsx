import React from 'react'

import { Link } from 'react-router-dom'

import PageTitle from 'components/page-title/index.jsx'

import './index.scss'

import Statistic from 'api/statistic.jsx'
import Util from 'util/index.jsx'

const mStatistic = new Statistic()
const mUtil = new Util()

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            userCount: '-',
            productCount: '-',
            orderCount: '-'
        }
    }
    componentWillMount() {
        // React的setState方法是个异步方法.所以, 若是在setState之后立即访问state, 往往是不能得到更新之后的state值的.
        // 如果要获取，解决方式
        // 1、放在setTimeout当中
        // 2、采用setState回调
        // https://reactjs.org/docs/react-component.html#setState
        // setState(updater, [callback])
        // updater是一个函数，如下
        // (prevState, props) => stateChange
        // 每当state得到更新,就会调用callback函数 .
        // 例如：
        /*
            this.setState((prevState, props) => {
                return {counter: prevState.counter + props.step}
            }, () => {
                console.log(this.state.counter)
            });
        */
        mStatistic.getStatisticCount().then(res => {
            this.setState({
                userCount: res.userCount,
                productCount: res.productCount,
                orderCount: res.orderCount
            })
        })
    }
    render() {
        return (
            <div id="page-wrapper">
                <PageTitle title="首页" />
                <div className="row">
                    <div className="col-md-4">
                        <Link to="/user" className="color-box brown">
                            <p className="count">{this.state.userCount}</p>
                            <p className="desc">
                                <i className="fa fa-user-o"></i>
                                <span>用户总数</span>
                            </p>
                        </Link>
                    </div>
                    <div className="col-md-4">
                        <Link to="/product" className="color-box green">
                            <p className="count">{this.state.productCount}</p>
                            <p className="desc">
                                <i className="fa fa-list"></i>
                                <span>商品总数</span>
                            </p>
                        </Link>
                    </div>
                    <div className="col-md-4">
                        <Link to="/order" className="color-box blue">
                            <p className="count">{this.state.orderCount}</p>
                            <p className="desc">
                                <i className="fa fa-check-square-o"></i>
                                <span>订单总数</span>
                            </p>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home