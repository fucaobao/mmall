import React from 'react'
import { Link } from 'react-router-dom'

import TableList from 'util/table-list/index.jsx'
import Pagination from 'util/pagination/index.jsx'

import PageTitle from 'components/page-title/index.jsx'

import User from 'api/user.jsx'
const mUser = new User()

import Util from 'util/index.jsx'
const mUtil = new Util()

class UserList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            list: [],
            pageNum: 1
        }
    }
    componentDidMount() {
        this.getUserList()
    }
    getUserList() {
        mUser.getUserList(this.state.pageNum).then(res => {
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
            this.getUserList()
        })
    }
    render() {
        return (
            <div id="page-wrapper">
                <PageTitle title="用户列表" />
                <TableList tableHead={['ID','用户名','邮箱','电话号码','创建时间']}>
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

export default UserList
