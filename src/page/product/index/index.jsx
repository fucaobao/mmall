import React from 'react'
import { Link } from 'react-router-dom'

import Pagination from 'util/pagination/index.jsx'

import PageTitle from 'components/page-title/index.jsx'
import TableList from 'util/table-list/index.jsx'

import Product from 'api/product.jsx'
const mProduct = new Product()

import Util from 'util/index.jsx'
const mUtil = new Util()

import './index.scss'

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
    onSetProductStatue(e, productId, currentStatus) {
        let newStatus = currentStatus == 1 ? 2 : 1,
            confirmTips = currentStatus == 1 ? '确定要下架该商品？' : '缺点要上架该商品'
        if (window.confirm(confirmTips)){
            mProduct.setProductStatus({
                productId: productId,
                status: newStatus
            }).then(res => {
                mUtil.successTips(res)
                this.getProductList()
            }, errMsg => {
                mUtil.errorTips(errMsg)
            })
        }
    }
    render() {
        let tableHead = [
            { 'name':'商品ID', 'width':'10%'},
            { 'name':'商品信息', 'width':'50%'},
            { 'name':'价格', 'width':'10%'},
            { 'name':'状态', 'width':'15%'},
            { 'name':'操作', 'width':'15%'}
        ]
        return (
            <div id="page-wrapper">
                <PageTitle title="商品列表" />
                <TableList tableHead={tableHead}>
                    {
                        this.state.list.map((product, index) => {
                            return (
                                <tr key={index}>
                                    <td>{product.id}</td>
                                    <td>
                                        <p>{product.name}</p>
                                        <p>{product.subtitle}</p>
                                    </td>
                                    <td>￥{product.price}</td>
                                    <td>
                                        <p>{product.status == 1 ? '在售' : '已下架'}</p>
                                        <button className="btn btn-xs btn-warning" onClick={(e) => {this.onSetProductStatue(e,product.id, product.status)}}>{product.status == 1 ? '下架' : '上架'}</button>
                                    </td>
                                    <td>
                                        <Link className="operate" to={`/product/detail/${product.id}`}>详情</Link>
                                        <Link className="operate" to={`/product/save/${product.id}`}>编辑</Link>
                                    </td>
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
