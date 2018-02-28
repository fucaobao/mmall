import React from 'react'

// 通用的table-list
class TableList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isFirstLoading: true
        }
    }
    // 父组件发生render的时候子组件就会调用componentWillReceiveProps（不管props有没有更新，也不管父子组件之间有没有数据交换）
    componentWillReceiveProps() {
        this.setState({
            isFirstLoading: false
        })
    }
    render() {
        let tableHead = this.props.tableHead.map((item, index) => {
            if (typeof item === 'object') {
                return <th key={index} width={item.width}>{item.name}</th>
            } else if (typeof item === 'string' || typeof item === 'number' || typeof item === 'boolean'){
                return <th key={index}>{item}</th>
            }
        })
        let listInfo = (
            <tr>
                <td colSpan={this.props.tableHead.length} className="text-center">{this.state.isFirstLoading ? '正在加载。。。' : '没有找到相应的结果'}</td>
            </tr>
        )
        let tableBody = this.props.children.length ? this.props.children : listInfo

        return (
            <div className="row">
                <div className="col-md-12">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                {
                                    tableHead
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {
                                tableBody
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default TableList