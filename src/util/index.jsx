class Util {
    doLogin() {
        window.location.href = '/login?redirect=' + encodeURIComponent(window.location.pathname)
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
                        typeof resolve === 'function' && resolve(res)
                    } else if(10 === res.status) {
                        // 没有登录状态，强制登录doLogin
                        this.doLogin()
                    } else {
                        typeof reject === 'function' && reject(res)
                    }
                },
                error(err) {
                    typeof reject === 'function' && reject(err)
                }
            })
        })
    }
}

export default Util