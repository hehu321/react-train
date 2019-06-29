import { Head } from "../../components/head";
import './index.scss'
import { connect } from 'react-redux'
import { InputItem ,WhiteSpace} from 'antd-mobile'
import { Hpicker } from "../../components/picker";
import ChooseSeat from "../../components/chooseseat";
import { Adress } from "../../components/adress";
import { saveMobile } from "../../actions";

@connect(
    state => {
        return {
            ordercontent: state.ordercontent
        }
    },
    dispatch=>{
        return{
            saveMobile:(val)=>{dispatch(saveMobile(val))}
        }
    }
)
export class ClosePage extends Component {
    login=()=>{
        this.props.history.push('/login')
    }
    componentWillMount() {
        if (!this.props.ordercontent.type) {
            this.props.history.push('/app/home')
        }
    }
    mobileChange=(v)=>{
        var mobileReg = /^1[3,6,5,7,8,9][0-9]{9}$/g
        if(mobileReg.test(v)){
            this.props.saveMobile(v)
        }
    }
    render() {
        const {
            arrivaltime,
            costtime,
            datelist,
            departuretime,
            endstation,
            seatPrice,
            seatType,
            station,
            trainno,
            type,
            typename
        } = this.props.ordercontent
        return (
            <div>
                <Head title='订单填写' left={true} />
                <div className='order-content '>
                    <div className='left'>
                        <div className="city">
                            {station}
                        </div>
                        <div className="time">
                            {departuretime}
                        </div>
                        <div>
                            {datelist && datelist[0]}
                        </div>
                    </div>
                    <div className='middle'>
                        <div className="trainname">
                            {trainno}{typename}
                        </div>
                        <div className="trainMid">
                            <span className='iconfont icon-huoche huoche'>

                            </span>
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
                            {datelist && datelist[1]}
                        </div>
                    </div>
                </div>
                <div className='seatInfo'>
                    <div className="seatType">
                        坐席
                    </div>
                    <p>
                        <span className="seatName">{seatType}</span>
                        <span className="seatPrice">¥{seatPrice}</span>
                    </p>
                </div>
                <div className='login'>
                    <div className='contentlogin' onClick={this.login}>
                        <p className="title">推荐登录12306账号</p>
                        <p className="content">登录后专享极速出票特权</p>
                    </div>
                    <div className='iconfont icon-jiantou1 icon'>
                    </div>
                </div>
                <WhiteSpace/>
                <InputItem
                    clear
                    placeholder="通知出票信息"
                    onChange={(v) => { this.mobileChange(v) }}
                    ref={el => this.userMobile = el}
                >联系手机</InputItem>
                <WhiteSpace/>
                <Hpicker title='出行保障' datalist={['高速出票套餐','12306预订']} />
                <WhiteSpace/>
                <Adress/>
                <WhiteSpace/>
                <ChooseSeat seatPrice={seatPrice} />
                <WhiteSpace/>
            </div>
            )
        }
    
    
}