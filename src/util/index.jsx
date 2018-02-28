const conf = {
    // online
    // serverHost: 'http://admin.happymmall.com'
    // dev
    serverHost: '',
    imageHost: 'http://img.happymmall.com/',
}

class Util {
    // 跳转到首页
    doLogin() {
        window.location.href = '/login?redirect=' + encodeURIComponent(window.location.pathname)
    }
    // 获取请求url地址
    getServerUrl(path) {
        return conf.serverHost + path
    }
    // 获取图片地址
    getImageUrl(path) {
        return conf.imageHost + path
    }
    // 获取URL参数
    getUrlParam(name, url) {
        let u = url || window.location.search,
            reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)'),
            r = u.substr(u.indexOf('\?') + 1).match(reg)
        return r != null ? decodeURIComponent(r[2]) : ''
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
    /**
     * flag:
     * 0:默认时间戳20150806101841065
     * 1:2015-10-16 17:35:32
     * 2:2015-10-16 17:35
     * 3:2015年10月16日
     * 4:2015-10-16
     * time:
     * 时间戳，毫秒数
     */
    cTimestamp(flag, time) {
        flag = parseInt(flag)
        let dt, str;
        if (!time) {
            dt = new Date()
        } else {
            dt = new Date(time)
        }
        let y = dt.getFullYear(),
            M = dt.getMonth() + 1,
            d = dt.getDate(),
            h = dt.getHours(),
            m = dt.getMinutes(),
            sec = dt.getSeconds(),
            minsec = dt.getMilliseconds()
        if (flag === 1) {
            str = String(y) + '-' + _addPrefix(M) + '-' + _addPrefix(d) + ' ' + _addPrefix(h) + ':' + _addPrefix(m) + ':' + _addPrefix(sec);
        } else if (flag === 2) {
            str = String(y) + '-' + _addPrefix(M) + '-' + _addPrefix(d) + ' ' + _addPrefix(h) + ':' + _addPrefix(m);
        } else if (flag === 3) {
            str = String(y) + '年' + _addPrefix(M) + '月' + _addPrefix(d) + '日';
        } else if (flag === 4) {
            str = String(y) + '-' + _addPrefix(M) + '-' + _addPrefix(d);
        } else {
            while (String(minsec).length < 3) {
                minsec = '0' + minsec;
            }
            str = String(y) + _addPrefix(M) + _addPrefix(d) + _addPrefix(h) + _addPrefix(m) + _addPrefix(sec) + minsec;
        }
        return str;

        function _addPrefix(num) {
            return num < 10 ? '0' + num : num;
        }
    }
    request(param) {
        return new Promise((resolve, reject) => {
            $.ajax({
                type: param.type || 'get',
                dataType: param.dataType || 'json',
                data: param.data || null,
                url : param.url || '',
                success: res => {
                    if(res.status === 0) {
                        typeof resolve === 'function' && resolve(res.data, res.msg)
                    } else if(10 === res.status) {
                        // 没有登录状态，强制登录doLogin
                        this.doLogin()
                    } else {
                        typeof reject === 'function' && reject(res.msg)
                    }
                },
                error: err => {
                    typeof reject === 'function' && reject(err.statusText)
                }
            })
        })
    }
}

export default Util