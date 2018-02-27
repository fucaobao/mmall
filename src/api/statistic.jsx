import Util from 'util/index.jsx'

const mUtil = new Util()

export default class Statistic {
    // 统计
    getStatisticCount() {
        return mUtil.request({
            url: mUtil.getServerUrl('/manage/statistic/base_count.do')
        })
    }
}