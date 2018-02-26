

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
}

export default User