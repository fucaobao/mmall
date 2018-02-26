import React from 'react'

class NavTop extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            userName: 'fucaobao'
        }
    }
    onLogout() {
        console.log('这是退出登录')
    }
    render() {
        return (
            <div className="navbar navbar-default top-navbar" role="navigation">
                <div className="navbar-header">
                    <a className="navbar-brand" href="#/"><b>HAPPY </b>MMALL</a>
                </div>

                <ul className="nav navbar-top-links navbar-right">
                    <li className="dropdown">
                        <a className="dropdown-toggle" href="#">
                            <i className="fa fa-user fa-fw"></i>
                            {
                                    this.state.userName ?
                                    <span>欢迎，{this.state.userName}</span> :
                                    <span>欢迎</span>
                            }
                            <i className="fa fa-caret-down"></i>
                        </a>

                        <ul className="dropdown-menu dropdown-user">
                            <li className="dropdown-item">
                                <a onClick={() => {this.onLogout()}}>
                                    <i className="fa fa-sign-out fa-fw"></i> 退出登录
                                </a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        )
    }
}

export default NavTop