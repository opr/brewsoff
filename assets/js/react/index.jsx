import React from 'react';
import ReactDOM from 'react-dom';
import {render} from 'react-dom'
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory, useRouterHistory } from 'react-router'
import { createHashHistory } from 'history'
import Home from './components/Home/Home.jsx';
import Party from './components/Party/Party.jsx';


const appHistory = useRouterHistory(createHashHistory)({ queryKey: false })

let anchors = {
    //testElement: { container: document.getElementById('test-element__react-anchor'), component: <TestElement /> }
};
for (var i in anchors) {
    if (anchors[i])
        render(anchors[i].component, anchors[i].container);
}

let App = React.createClass({
    render() {
        return (
            <Router history={browserHistory}>
                <Route path='/' component={Home} />
                <Route path='/party/:party' component={Party} />
                <Route path='*' component={Home} />
            </Router>
        )
    }
});
export default App


ReactDOM.render(<App />, document.getElementById('app'))