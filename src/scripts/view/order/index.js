import { Head } from "../../components/head";
import { connect } from 'react-redux'
import './index.scss'
import { getOrder } from "../../actions";
import { TrainList } from "../../components/traintime";
import { SeatType } from "../../components/seattype";


@connect(
    state => {
        return {
            ...state
        }
    },
    dispatch => {
        return {
            getOrder: (obj) => { dispatch(getOrder(obj)) }
        }
    }
)
export class OrderPage extends Component {
    state = {
        tarinflag: false
    }
    componentWillMount() {
        let url = 'train/line';
        let params = {
            appkey: 'cc553c99d092df9c',
            trainno: this.props.match.params.trainno,
            date: this.props.date,
        }
        this.props.getOrder({ url, params })
    }
    onClose = () => {
        this.setState({
            tarinflag: !this.state.tarinflag
        })
    }
    getDate = () => {
        let arr = this.props.date.split('-')
        var day = 0;
        this.props.orderDetail.forEach((item, i) => {
            if (item.station == this.props.match.params.station) {
                day = (item.day-1)
            }
        })
        var now = new Date();
        now.setFullYear(arr[0])
        now.setMonth(arr[1]-1)
        now.setDate(arr[2])
        var week = ['周日','周一','周二','周三','周四','周五','周六']
        var list = []
        var time1 = now.getMonth() + 1 + '月' + now.getDate()+'日'+ week[now.getDay()]
        var time2 = now.getMonth() + 1 + '月' + now.getDate(now.setDate(now.getDate()+day))+'日'+week[now.getDay()]
        list.push(time1,time2)
        return list;
    }
    render() {
        const {
            orderDetail,
            typename,
            traintype,
            ordercontent
        } = this.props
        const {
            trainno,
            station,
            endstation,
            departuretime,
            arrivaltime,
            costtime,
        } = this.props.match.params
        return (
            <div>
                <Head title={this.props.match.params.trainno} left={true} />
                <div className='order-content '>
                    <div className='left'>
                        <div className="city">
                            {station}
                        </div>
                        <div className="time">
                            {departuretime}
                        </div>
                        <div>
                            {this.getDate()[0]}
                        </div>
                    </div>
                    <div className='middle'>
                        <div className="trainname">
                            {trainno}{typename}
                        </div>
                        <div className="trainMid">
                            <span className="trainMid-left"></span>
                            <span className="timer" onClick={this.onClose}>时刻表</span>
                            <span className="trainMid-left"></span>
                        </div>
                        <div className='trainTime'>
                            耗时{costtime}
                        </div>
                    </div>
                    <div className='right'>
                        <div className="city">
                            {endstation}
                        </div>
                        <div className="time">
                            {arrivaltime}
                        </div>
                        <div>
                            {this.getDate()[1]}
                        </div>
                    </div>
                </div>
                <TrainList orderDetail={orderDetail} tarinflag={this.state.tarinflag} changFlag={this.onClose} />
                <SeatType type={traintype} typename={typename} {...this.props.match.params} datelist={this.getDate()}/>
            </div>
        )
    }

}