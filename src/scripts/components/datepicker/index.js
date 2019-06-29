
import { Flex } from 'antd-mobile'
import { connect } from 'react-redux'
import './index.scss'
import { changeDate, getTicketList } from '../../actions';

@connect(
    state => {
        return {
            ...state
        }
    },
    dispatch => {
        return {
            changeDate: (key) => { dispatch(changeDate(key)) },
            getTicketList:({url,params})=>{dispatch(getTicketList({url,params}))}
        }
    }
)
export class DatePicker extends Component {
    state = {
        show:this.props.flag
    }
    switchTime = (flag) => {
        var now = new Date();
        var day = now.getDate();
        var time = this.props.date;
        var list = time.split('-');
        now.setFullYear(list[0])
        now.setMonth((list[1] - 1))
        now.setDate(list[2])
        if (flag) {
            now.setDate((now.getDate() + 1))
            var date = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate()
        } else {
            if (day == now.getDate()) {
                return false;
            } else {
                now.setDate((now.getDate() - 1))
                var date = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate()
            }
        }
        this.props.changeDate(date)
        let url = '/train/station2s';
        let params = {
            appkey:'cc553c99d092df9c',
            start:this.props.from,
            end:this.props.to,
            ishigh:!this.state.show?1:0,
            date
        }
        this.setState({
            show:!this.state.show
        })
        this.props.getTicketList({url,params})
    }

    render() {
        const {
            date,
        } = this.props
        return (
            <div className='datepicker' >
                <Flex>
                    <Flex.Item style={{ textAlign: 'center' }} onClick={()=>{this.switchTime(false)}}>前一天</Flex.Item>
                    <Flex.Item style={{ textAlign: 'center' }}>{date}</Flex.Item>
                    <Flex.Item style={{ textAlign: 'center' }} onClick={()=>{this.switchTime(true)}}>后一天</Flex.Item>
                </Flex>
            </div>
        )
    }
}