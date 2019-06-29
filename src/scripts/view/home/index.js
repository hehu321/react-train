import { Head } from "../../components/head";
import './index.scss'

import { Flex, InputItem, WhiteSpace, WingBlank, Checkbox, Button,Toast } from 'antd-mobile'

import switchImg from './img/switch.svg'
import { connect } from 'react-redux'
import { CalendarPerson } from "../../components/calendar";
import { exchangeCity, changeFlag, changeCitySwitch, getCityList, changeType } from "../../actions";
import { CityList } from "../../components/cityList";

const btnList = [
    { img: require('./img/icon_qiang.png'), txt: '抢票',type:0 },
    { img: require('./img/icon_rail.png'), txt: '火车境外' ,type:0},
    { img: require('./img/icon-order.png'), txt: '我的订单' ,type:1}
]

const CheckboxItem = Checkbox.CheckboxItem;

@connect(
    state => {
        return {
            ...state
        }
    },
    dispatch => {
        return {
            getCityList: (url) => { dispatch(getCityList(url)) },
            exchangeCity: () => { dispatch(exchangeCity()) },
            changeFlag: (flag) => { dispatch(changeFlag(flag)) },
            changeCitySwitch: () => { dispatch(changeCitySwitch()) },
            changeType: (ctype) => { dispatch(changeType(ctype)) }
        }
    }
)
export class Home extends Component {
    onChange = () => {
        this.props.changeFlag(!this.props.flag)
    }
    openCity = (ctype) => {
        this.props.changeType(ctype)
        this.props.changeCitySwitch()
        if (!this.props.cityList.msg) {
            this.props.getCityList('react/citylist')
        }
    }
    onClick =(type)=>{
        if(type){
            this.props.history.push('/app/my')
        }else{
            Toast.info('功能暂未开发,敬请期待',1)
        }
    }
    render() {
        const {
            from,
            to,
            exchangeCity,
            flag,
            history
        } = this.props
        return (
            <div>
                <Head title="火车票" />
                <div style={{ width: '100%', overflow: "hidden" }}>
                    <WingBlank className='card-border' >
                        <Flex className='child-border'>
                            <InputItem value={from} editable={false} style={{ textAlign: 'center', fontSize: '24px' }} onClick={() => this.openCity('from')} />
                            <div style={{ backgroundColor: '#fff' }} onClick={exchangeCity} >
                                <img src={switchImg} width="70" height="40" alt="switch" style={{ display: 'inline-block' }} />
                            </div>
                            <InputItem value={to} editable={false} style={{ textAlign: 'center', fontSize: '24px' }} onClick={() => this.openCity('to')} />
                        </Flex>
                        <Flex className='child-border'>
                            <CalendarPerson />
                        </Flex>
                        <Flex className='child-border'>
                            <CheckboxItem onChange={this.onChange} checked={flag}>
                                只看高铁/动车
                        </CheckboxItem>
                        </Flex>
                        <WhiteSpace />
                        <Button
                            style={{ width: '80%', marginLeft: '10%', backgroundColor: '#108ee9', color: '#FFF', borderRadius: '20px' }}
                            onClick={() => { history.push('/app/ticket') }}
                        >搜索</Button><WhiteSpace />
                    </WingBlank>
                </div>
                <CityList />
                <div className="home-warp">
                    {
                        btnList.map((item, i) => {
                            return (
                                <div className="btn-list" key={i} onClick={()=>{this.onClick(item.type)}}>
                                    <img src={item.img} alt="" />
                                    <p>{item.txt}</p>
                                </div>
                            )
                        })
                    }
                </div>
                
                
            </div>
        )
    }

}

