import React from 'react'
import { Link } from 'react-router-dom'

import Pagination from 'util/pagination/index.jsx'

import PageTitle from 'components/page-title/index.jsx'
import TableList from 'util/table-list/index.jsx'

import Product from 'api/product.jsx'
const mProduct = new Product()

import Util from 'util/index.jsx'
const mUtil = new Util()

class ProductList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            list: [],
            pageNum: 1
        }
    }
    componentDidMount() {
        this.getProductList()
    }
    getProductList() {
        mProduct.getProductList(this.state.pageNum).then(res => {
            this.setState(res)
        }, errMsg => {
            this.setState({
                list: []
            })
            mUtil.errorTips(errMsg)
        })
    }
    onPageNumChange(pageNum) {
        this.setState({
            pageNum: pageNum
        }, () => {
            this.getProductList()
        })
    }
    render() {
        return (
            <div id="page-wrapper">
                <PageTitle title="商品列表" />
                <TableList>
                    {
                        this.state.list.map((user, index) => {
                            return (
                                <tr key={index}>
                                    <td>{user.id}</td>
                                    <td>{user.username}</td>
                                    <td>{user.email}</td>
                                    <td>{user.phone}</td>
                                    <td>{mUtil.cTimestamp(1, user.createTime)}</td>
                                </tr>
                            )
                        })
                    }
                </TableList>
                <Pagination current={this.state.pageNum} total={this.state.total} onChange={(pageNum) => {
                    this.onPageNumChange(pageNum)
                }} />
            </div>
        )
    }
}

export default ProductList
