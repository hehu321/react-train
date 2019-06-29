
import { HashRouter as Router, Route, Switch,Redirect } from 'react-router-dom'
import { App } from './app';
import { Login } from './login';

export class View extends Component {
    render() {
        return (
            <Router>
                <Route path='' strtic component={Layout} />
            </Router>
        )
    }
}



function Layout() {
    return (
        <Switch>
            <Route path='/app' strict  component={App} />
            <Route path='/login' exact component={Login} />
            <Redirect to='/app'></Redirect>
        </Switch>
    )
}