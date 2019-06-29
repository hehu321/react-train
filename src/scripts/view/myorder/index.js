import './index.scss'
import { Head } from '../../components/head';
import { Card, WhiteSpace, Result, Icon,Button,WingBlank} from 'antd-mobile';
export class MyOrder extends Component {
    componentWillMount() {
        if (localStorage.historyList) {
            var list = JSON.parse(localStorage.historyList);
            this.setState({
                myOrderList: list,
                flag: true
            })
        }
    }
    state = {
        flag: false,
        myOrderList: []
    }
    render() {
        const {
            flag,
            myOrderList
        } = this.state
        return (
            <div>
                <Head title='我的订单' left={true} />
                <div  style={{ display: flag ? 'none' : 'block' }}>
                    <Result
                        img={<Icon type="cross-circle-o" className="spe" style={{ fill: '#F13642' }} />}
                        title="暂无记录"
                        message="请购票后查看"
                    />
                    <WhiteSpace size='md'/>
                    <Button  type="primary" 
                    onClick={()=>{
                            this.props.history.push('/app/home')
                    }}>去购票</Button>
                </div>
                <div style={{ display: flag ? 'block' : 'none' }}>
                    {
                        myOrderList && myOrderList.map((item, i) => {
                            return (
                                <div key={i}>
                                    <Card full>
                                        <Card.Header
                                            title={'总价:¥' + item.totalPrice}
                                            thumb={require('./img/train.png')}
                                            extra={<span>乘车人数:{item.personNum}</span>}
                                        />
                                        <Card.Body>
                                            <div>
                                                <div className='cardlist'>
                                                    <div className="header">
                                                        <div className="log">
                                                            <img src={require('./img/logo.png')} alt="" />
                                                        </div>
                                                        <div className="content">
                                                            <div>{item.ordercontent.station}</div>
                                                            <div className="go">
                                                                <div>{item.ordercontent.trainno}</div>
                                                                <div>
                                                                    <img src={require('./img/go.png')} alt="" />
                                                                </div>
                                                            </div>
                                                            <div>{item.ordercontent.endstation}</div>
                                                        </div>
                                                    </div>
                                                    <div className='time'>
                                                        <div className="depart">
                                                            出发时间:{item.ordercontent.datelist[0]}/{item.ordercontent.departuretime}
                                                        </div>
                                                        <div className='pic'>
                                                            <img src={require('./img/time.png')} alt="" />
                                                        </div>
                                                        <div className="arrive">
                                                            到达时间:{item.ordercontent.datelist[1]}/{item.ordercontent.arrivaltime}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Card.Body>
                                        <Card.Footer content={<span>手机号:{item.mobile}</span>} extra={<div>请注意出行时间!</div>} />
                                    </Card>
                                    <WhiteSpace />
                                </div>
                            )
                        })
                    }
                    <WingBlank>
                        <Button type='primary'
                            onClick={()=>{
                                this.props.history.push('/app/home')
                            }}
                        >去购票</Button>
                        <WhiteSpace />
                        <Button type='warning'
                            onClick={()=>{
                                this.props.history.push('/app/my')
                            }}
                        >个人中心</Button>
                    </WingBlank>
                </div>
            </div>
        )
    }
}