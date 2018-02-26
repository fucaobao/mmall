import React from 'react'

import PageTitle from 'components/page-title/index.jsx'

class Home extends React.Component {
    render() {
        return (
            <div id="page-wrapper">
                <PageTitle title="首页">
                    <button className="btn btn-success">按钮</button>
                </PageTitle>
            </div>
        )
    }
}

export default Home