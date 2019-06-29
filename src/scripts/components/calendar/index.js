
import { Calendar } from 'antd-mobile'
import './index.scss'
import zhCN from 'antd-mobile/lib/calendar/locale/zh_CN';
import {connect} from 'react-redux'
import { changeDate } from '../../actions';

const extra = {
    '2017/07/15': { info: 'Disable', disable: true },
};

const now = new Date();
const num = now.getDate();
for(let i = 1; i < num ; i++){
extra[+new Date(now.getFullYear(), now.getMonth(), i)] = { info: '', disable: true };
}
extra[+new Date(now.getFullYear(), now.getMonth(), now.getDate())] = { info: '今天', disable: false };


Object.keys(extra).forEach((key) => {
    const info = extra[key];
    const date = new Date(key);
    if (!Number.isNaN(+date) && !extra[+date]) {
        extra[+date] = info;
    }
});


@connect(
    state=>{
        return{
            ...state
        }
    },
    dispatch=>{
        return{
            changeDate:(date)=>{dispatch(changeDate(date))}
        }
    }
)
export class CalendarPerson extends Component {
    state = {
        show: false,
        config: {
            locale: zhCN,
            type:'one'
        }
    }
    onSelectHasDisableDate = (dates) => {
        console.warn('onSelectHasDisableDate', dates);
    }

    onConfirm = (startTime) => {
        document.getElementsByTagName('body')[0].style.overflowY = this.originbodyScrollY;
        this.setState({
            show: false,
        });
        let date = startTime.getFullYear() + '-' + (startTime.getMonth() + 1 )+ '-' + startTime.getDate()
        this.props.changeDate(date)
        console.log(startTime)
    }

    onCancel = () => {
        document.getElementsByTagName('body')[0].style.overflowY = this.originbodyScrollY;
        this.setState({
            show: false,
            startTime: undefined,
            endTime: undefined,
        });
    }

    getDateExtra = date => extra[+date];
    render() {
        const {
            date,
            
        } = this.props
        return (
            <div>
                <div className ='changedate'
                    onClick={() => {
                        document.getElementsByTagName('body')[0].style.overflowY = 'hidden';
                        this.setState({
                            show: true,
                        });
                    }}
                >
                    选择日期:{date}
                </div>
                <Calendar
                    {...this.state.config}
                    visible={this.state.show}
                    onCancel={this.onCancel}
                    onConfirm={this.onConfirm}
                    onSelectHasDisableDate={this.onSelectHasDisableDate}
                    getDateExtra={this.getDateExtra}
                    defaultDate={now}
                    minDate={new Date(+now - 5184000000)}
                    maxDate={new Date(+now + 5153600000)}
                    enterDirection='horizontal'
                    initalMonths = {3}
                />
            </div>
        )
    }

}