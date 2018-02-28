import React from 'react'

import './index.scss'

import User from 'api/user.jsx'
import Util from 'util/index.jsx'

const mUser = new User()
const mUtil = new Util()

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            redirect: mUtil.getUrlParam('redirect')
        }
        this.handler = (e) => {
            if(e.keyCode === 13) {
                console.log('login')
                this.onSubmit()
            }
        }
    }
    // DOM节点将要加载的时候，此时数据已经准备好
    componentWillMount() {
        document.title = '登录 - MMALL'
    }
    // DOM节点加载完成时候
    componentDidMount() {
        document.addEventListener('keyup', this.handler, false)
    }
    // 将要离开页面的时候
    componentWillUnmount() {
        document.removeEventListener('keyup', this.handler, false)
    }
    onInputChange(e) {
        let inputName = e.target.name,
            inputValue = e.target.value
        // es6的key值key可以是变量，用中括号包起来
        this.setState({
            [inputName]: inputValue
        })
    }
    onSubmit() {
        let loginInfo = {
            username: this.state.username,
            password: this.state.password
        }
        let checkResult = mUser.checkLoginInfo(loginInfo)
        if(!checkResult.status){
            mUtil.errorTips(checkResult.msg)
            return
        }
        // http://admintest.happymmall.com
        mUser.login(loginInfo).then((res) => {
            mUtil.setStorage('userInfo', res)
            this.props.history.push(this.state.redirect)
        }, (errMsg) => {
            mUtil.errorTips(errMsg)
        })
    }
    render() {
        return (
            <div className="col-md-4 col-md-offset-4">
                <div className="panel panel-default login-panel">
                    <div className="panel-heading">欢迎登录 --- HAPPY MMALL管理系统</div>
                    <div className="panel-body">
                        <div>
                            <div className="form-group">
                                <input type="text" className="form-control" placeholder="请输入用户名" name="username" onChange={e => this.onInputChange(e)} />
                            </div>
                            <div className="form-group">
                                <input type="password" className="form-control" placeholder="请输入密码" name="password" onChange={e => this.onInputChange(e)} />
                            </div>
                            <button className="btn btn-lg btn-block btn-primary" onClick={e => this.onSubmit(e)}>登录</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login