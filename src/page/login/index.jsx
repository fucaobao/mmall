import React from 'react'

import './index.scss'

import User from 'service/user.jsx'

const mUser = new User()

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: ''
        }
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
        // http://admintest.happymmall.com
        mUser.login({
            username: this.state.username,
            password: this.state.password
        }).then((res) => {
            console.log(res)
        }, (err) => {
            console.log(err)
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
                                <input type="text" className="form-control" placeholder="请输入用户名" name="username" onChange={e => this.onInputChange(e)}
                                />
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