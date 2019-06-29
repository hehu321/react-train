import './index.scss'
import { Accordion } from 'antd-mobile'
import {connect} from 'react-redux'
import { getOrderContnet } from '../../actions';
import history from '@/utils/history'
const list = [
    { type: 'Z', seat: [{ type: '硬座', price: 123, num: '有票' }, { type: '硬卧', price: 223, num: '有票' }, { type: '软卧', price: 343, num: '有票' }, { type: '无座', price: 99, num: '有票' }] },
    { type: 'K', seat: [{ type: '硬座', price: 166, num: '有票' }, { type: '硬卧', price: 267, num: '有票' }, { type: '软卧', price: 355, num: '有票' }, { type: '无座', price: 66, num: '有票' }] },
    { type: 'T', seat: [{ type: '硬座', price: 199, num: '有票' }, { type: '硬卧', price: 333, num: '有票' }, { type: '软卧', price: 666, num: '有票' }, { type: '无座', price: 89, num: '有票' },{type:'高级软卧',price:1300,num:'有票'}] },
    { type: 'D', seat: [{ type: '二等座', price: 345, num: '有票' }, { type: '一等座', price: 445, num: '有票' }, { type: '无座', price: 200, num: '有票' }, { type: '商务座', price: 1100, num: '有票' },] },
    { type: 'G', seat: [{ type: '二等座', price: 455, num: '有票' }, { type: '一等座', price: 655, num: '有票' }, { type: '商务座', price: 2000, num: '有票' },] },
]

@connect(
    state=>{
        return {

        }
    },
    dispatch=>{
        return {
            getOrderContnet:(obj)=>{dispatch(getOrderContnet(obj))}
        }
    }
)
export class SeatType extends Component {
    render() {
        const {
            type,
            getOrderContnet
        } = this.props
        return (
            <div className="seat-type">
                <Accordion accordion>
                    {
                        list.map((item, i) => {
                            if (item.type == type) {
                                return item.seat.map((item1, i1) => {
                                    return (
                                        <Accordion.Panel header={<ul>
                                            <li className='content cl' key={i1}>
                                                <span className="seat">
                                                    {item1.type}
                                                </span>
                                                <span className='price'>
                                                    ¥{item1.price}
                                                </span>
                                                <span className="my-btn">
                                                    预定
                                                </span>
                                                <span className="num">
                                                    {item1.num}
                                                </span>
                                            </li>
                                        </ul>}>
                                       
                                            <li className='boxwarp'>
                                                <i className='icon iconfont icon-shandian' style={{color:'orange'}}></i>
                                                <div className="middle">
                                                    <div className="title">
                                                    去哪儿快速预订
                                                    </div>
                                                    <div className="article">
                                                    火车票200元+30元优惠券包,7*24小时服务
                                                    </div>
                                                </div>
                                                <div className="buy-btn" onClick={()=>{getOrderContnet({...this.props,seatType:item1.type,seatPrice:item1.price});history.push('/app/close')}}>
                                                        买票
                                                </div>
                                            </li>
                                            <li className='boxwarp'>
                                                <i className='icon iconfont icon-piaoquan' style={{color:'#B3CEE4',fontSize:'28px'}}></i>
                                                <div className="middle">
                                                    <div className="title">
                                                    普通预定
                                                    </div>
                                                    <div className="article">
                                                    去哪儿帮你买，官网直购
                                                    </div>
                                                </div>
                                                <div className="buy-btn" onClick={()=>{getOrderContnet({...this.props,seatType:item1.type,seatPrice:item1.price});history.push('/app/close')}}>
                                                        买票
                                                </div>
                                            </li> 
                                        </Accordion.Panel>
                                    )
                                })
                            }
                        })
                    }
                </Accordion>
            </div>
        )
    }
}