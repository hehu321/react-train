
import {Switch,Route,Redirect} from 'react-router-dom'
import { Home } from '../home';
import { TicketList } from '../ticket';
import { OrderPage } from '../order';
import { ClosePage } from '../close';
import {PersonCenter} from '../my';
import { MyOrder } from '../myorder';

export class App extends Component {

    render() {
        return (
            <Switch>
                <Route path='/app/home' component={Home} />
                <Route path='/app/ticket' component={TicketList} />
                <Route path='/app/order/:trainno/:station/:endstation/:departuretime/:arrivaltime/:costtime' component={OrderPage} />
                <Route path='/app/close' component={ClosePage} />
                <Route path='/app/my' component={PersonCenter} />
                <Route path='/app/myorder' component={MyOrder} />
                <Redirect to='/app/home' />   
            </Switch>
        )
    }

}