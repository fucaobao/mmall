class Util {
    doLogin() {
        window.location.href = '/login?redirect=' + encodeURIComponent(window.location.pathname)
    }
    getUrlParam(name, url) {
        let u = url || window.location.search,
            reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)'),
            r = u.substr(u.indexOf('\?') + 1).match(reg)
        return r != null ? decodeURIComponent(r[2]) : '';
    }
    errorTips(errMsg) {
        alert(errMsg || '出错了')
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