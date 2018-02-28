import React from 'react'
import { Link } from 'react-router-dom'

import Pagination from 'util/pagination/index.jsx'

import PageTitle from 'components/page-title/index.jsx'
import TableList from 'util/table-list/index.jsx'

import ListSearch from './index-list-search.jsx'

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
            pageNum: 1,
            listType: 'list'
        }
    }
    componentDidMount() {
        this.getProductList()
    }
    // 加载商品列表
    getProductList() {
        debugger
        let listParam = {}
        let listType = this.state.listType
        listParam.listType = listType
        listParam.pageNum = this.state.pageNum
        // 如果是搜索的话，需要传入搜索条件
        if (listType == 'search') {
            listParam.searchType = this.state.searchType
            listParam.keyword = this.state.searchKeyword
        }
        mProduct.getProductList(listParam).then(res => {
            this.setState(res)
        }, errMsg => {
            this.setState({
                list: []
            })
            mUtil.errorTips(errMsg)
        })
    }
    // 搜索
    onSearch(searchType, searchKeyword) {
        let listType = searchKeyword === '' ? 'list' : 'search'
        this.setState({
            listType: listType,
            pageNum: 1,
            searchType: searchType,
            searchKeyword: searchKeyword
        }, () => {
            this.getProductList()
        });
    }
    // 页面改变时
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
                <ListSearch onSearch={(searchType, searchKeyword) => this.onSearch(searchType, searchKeyword)}/>
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
