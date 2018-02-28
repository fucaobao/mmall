

import Util from 'util/index.jsx'

const mUtil = new Util()

class Product {
    getProductList(pageNum) {
        return mUtil.request({
            type: 'post',
            url: '/manage/product/list.do',
            data: {
                pageNum: pageNum
            }
        })
    }
    setProductStatus(productInfo) {
        return mUtil.request({
            type: 'post',
            url: '/manage/product/set_sale_status.do',
            data: productInfo
        })
    }
}

export default Product