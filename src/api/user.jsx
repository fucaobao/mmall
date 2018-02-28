

import Util from 'util/index.jsx'

const mUtil = new Util()

class User {
    login(userInfo) {
        return mUtil.request({
            type: 'post',
            url: '/manage/user/login.do',
            data: userInfo
        })
    }
    logout() {
        return mUtil.request({
            type: 'post',
            url: '/user/logout.do'
        })
    }
    getUserList(pageNum) {
        return mUtil.request({
            type: 'post',
            url: '/manage/user/list.do',
            data: {
                pageNum: pageNum
            }
        })
    }
    // 校验登录接口的数据是不是合法的
    checkLoginInfo(userInfo){
        let username = userInfo.username
        let password = userInfo.password
        if(typeof username !== 'string' || !username.length){
            return {
                status: false,
                msg: '用户名不能为空！'
            }
        }
        if(typeof password !== 'string' || !password.length){
            return {
                status: false,
                msg: '密码不能为空！'
            }
        }
        return {
            status: true,
            msg: '验证通过'
        }
    }
}

export default User