import React from 'react'

import './index.scss'

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
        // es6的key值key是变量，用中括号包起来
        this.setState({
            [inputName]: inputValue
        })
    }
    render() {
        return (
            <div className="col-md-4 col-md-offset-4">
                <div className="panel panel-default login-panel">
                    <div className="panel-heading">欢迎登录 --- HAPPY MMALL管理系统</div>
                    <div className="panel-body">
                        <form>
                            <div className="form-group">
                                <input type="text" className="form-control" placeholder="请输入用户名" name="username" onChange={e => this.onInputChange(e)}
                                />
                            </div>
                            <div className="form-group">
                                <input type="password" className="form-control" placeholder="请输入密码" name="password" onChange={e => this.onInputChange(e)} />
                            </div>
                            <button type="submit" className="btn btn-lg btn-block btn-primary">登录</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login