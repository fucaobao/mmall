class Util {
    doLogin() {
        window.location.href = '/login?redirect=' + encodeURIComponent(window.location.pathname)
    }
    // 获取URL参数
    getUrlParam(name, url) {
        let u = url || window.location.search,
            reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)'),
            r = u.substr(u.indexOf('\?') + 1).match(reg)
        return r != null ? decodeURIComponent(r[2]) : '';
    }
    errorTips(errMsg) {
        alert(errMsg || '出错了')
    }
    // 向本地存储里放数据
    setStorage(name, data) {
        // array / json
        if (typeof data === 'object' && data !== null) {
            let jsonString = JSON.stringify(data)
            window.localStorage.setItem(name, jsonString)
        }
        // number / string / boolean
        else if (typeof data === 'number' || typeof data === 'string' || typeof data === 'boolean') {
            window.localStorage.setItem(name, data)
        }
        // undefined / function
        else {
            alert('该数据类型不能用于本地存储')
        }
    }
    // 从本地存储获取数据
    getStorage(name) {
        let data = window.localStorage.getItem(name)
        if (data) {
            // JSON.parse
            return JSON.parse(data)
        } else {
            return ''
        }
    }
    // 删除本地存储
    removeStorage(name) {
        window.localStorage.removeItem(name)
    }
    request(param) {
        return new Promise((resolve, reject) => {
            $.ajax({
                type: param.type || 'get',
                dataType: param.dataType || 'json',
                data: param.data || null,
                url : param.url || '',
                success(res) {
                    if(res.status === 0) {
                        typeof resolve === 'function' && resolve(res.data, res.msg)
                    } else if(10 === res.status) {
                        // 没有登录状态，强制登录doLogin
                        this.doLogin()
                    } else {
                        typeof reject === 'function' && reject(res.msg)
                    }
                },
                error(err) {
                    typeof reject === 'function' && reject(err.statusText)
                }
            })
        })
    }
}

export default Util