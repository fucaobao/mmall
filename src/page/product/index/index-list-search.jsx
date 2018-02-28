// react
import React from 'react'

class ListSearch extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            searchType: 'productId', //productId,productName
            searchKeyword: ''
        }
        this.handler = (e) => {
            if(e.keyCode === 13) {
                console.log('search')
                this.onSearch()
            }
        }
    }
    componentDidMount() {
        document.addEventListener('keyup', this.handler, false)
    }
    componentWillUnmount() {
        document.removeEventListener('keyup', this.handler, false)
    }
    onValueChange(e) {
        let value = e.target.value.trim()
            name = e.target.name
        this.setState({
            [name]: value
        })
    }
    onSearch() {
        this.props.onSearch(this.state.searchType, this.state.searchKeyword)
    }
    render() {
        return (
            <div className="row search-wrap">
                <div className="col-md-12">
                    <div className="form-inline">
                        <div className="form-group">
                            <select className="form-control" name="searchType" onChange={
                                (e) => this.onValueChange(e)
                            }>
                                <option value="productId">按商品ID查询</option>
                                <option value="productName">按商品名称查询</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <input type="text" name="searchKeyword" className="form-control" 
                            onChange={
                                (e) => this.onValueChange(e)
                            }
                            placeholder="关键词" />
                        </div>
                        <button className="btn btn-primary" onClick={(e) => {
                            this.onSearch(e)
                        }}>搜素</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default ListSearch