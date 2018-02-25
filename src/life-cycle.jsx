import React from 'react';
import ReactDOM from 'react-dom';

class Component extends React.Component {
    // 初始化，对应vue的beforeCreated
    constructor(props) {
        // 只要组件存在constructor, 就必要要写super, 否则this指向会错误
        super(props);
        this.state = {
            data: "Old State"
        }
        console.log('初始化：');
    }
    // 将要加载，对应vue的created
    // 1、组件刚经历constructor,初始完数据
    // 2、组件还未进入render，组件还未渲染完成，dom还未渲染
    componentWillMount() {
        console.log('componentWillMount')
    }
    // 加载完成，对应vue的mounted
    // 组件第一次渲染完成，此时dom节点已经生成，可以在这里调用ajax请求，返回数据setState后组件会重新渲染
    componentDidMount() {
        console.log('componentDidMount')
    }
    // 将要接收props改变
    componentWillReceiveProps() {
        console.log('componentWillReceiveProps')
    }
    // 子组件是不是应该更新
    shouldComponentUpdate(nextProps, nextState) {
        console.log('shouldComponentUpdate')
        console.log('oldProps:', this.props)
        console.log('newProps:', nextProps)
        console.log('oldState:', this.state)
        console.log('newState:', nextState)
        return true;
    }
    // 组件将要更新
    componentWillUpdate() {
        console.log('componentWillUpdate')
    }
    // 组件更新完成
    componentDidUpdate() {
        console.log('componentDidUpdate')
    }
    // 组件将要销毁
    componentWillUnmount() {
        console.log('componentWillUnmount')
    }
    // 错误处理
    componentDidCatch(error, info) {
        console.log('componentDidCatch')
    }
    onStateChange() {
        console.log('state变化：');
        this.setState({
            // data: 'New State'
            data: this.state.data
        });
    }
    render() {
        console.log('render')
        return (
            <div>
                <h1>State : {this.state.data}</h1>
                <h1>State : {this.props.data}</h1>
                <button onClick={() => { this.onStateChange() }}>改变state</button>

            </div>
        );
    }
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: 'Old Props',
            hasChild: true
        }
    }
    onPropsChange(e) {
        console.log('props变化：');
        this.setState({
            data: 'New Props'
            // data: this.state
        });
    }
    onChildDestory() {
        console.log('子组件销毁：');
        this.setState({
            hasChild: false
        });
    }
    render() {
        return (
            <div>
                {
                    this.state.hasChild ? <Component data={this.state.data} /> : null
                }
                <button onClick={() => { this.onPropsChange() }}>props改变</button>
                <button onClick={() => { this.onChildDestory() }}>干掉子组件</button>
            </div>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('app')
);