import { Head } from "../../components/head";
import { Card, WhiteSpace, List, Toast } from 'antd-mobile'
import axios from '@/utils/axios'
var Item = List.Item;
import './index.scss'
const middleList = [
    { txt: '我的订单', type: 1, img: require('./img/dingdan.png') },
    { txt: '我的退款', type: 0, img: require('./img/money.png') },
    { txt: '我的发票', type: 0, img: require('./img/fapiao.png') },
    { txt: '我的攻略', type: 0, img: require('./img/book.png') },
]
const footerList = [
    { txt: '意见反馈', type: 0, img: require('./img/sug.png') },
    { txt: '关于去哪儿网', type: 0, img: require('./img/guanyu.png') },
]
export class PersonCenter extends Component {
    state = {
        loginFlag: false,
        username: '',
        money: '0.00',
        card: '0',
        logoimg: require('./img/avatar.png')
    }
    outLogin = () => {
        localStorage.removeItem('mobile')
        sessionStorage.removeItem('userInfo')
        this.setState({
            loginFlag: false,
            money: '0.00',
            card: '0'
        })
    }
    componentWillMount() {
        var username = localStorage.username ? localStorage.username : localStorage.mobile;
        if(localStorage.mobile){
            axios.get('/react/getlogo',{
                params:{
                    mobile:localStorage.mobile.replace(/\s/g,'')
                }
            }).then(res=>{
                if(res.data.imgUrl){
                    this.setState({
                        logoimg:res.data.imgUrl.replace(/public/, 'http://localhost:3000')
                    })
                }
            })
        }
        if (username) {
            this.setState({
                loginFlag: true,
                username,
                money: '999.99',
                card: '1'
            })
        }
    }
    onClick = (type) => {
        if (type) {
            this.props.history.push('/app/myorder')
        } else {
            Toast.offline('功能暂未实现,敬请期待', 1)
        }
    }
    upLogo = () => {
        this.fileinp.click()
    }
    upImg=(e)=> {
        var $target = e.target || e.srcElement
        var file = $target.files[0];
        var data = new FormData();
        data.append('avatar', file);
        axios({
            url: '/react/upload',
            method: 'POST',
            contentType: false,
            processData: false,
            data: data
        }).then(res => {
            this.setState({
                logoimg:res.data.imgUrl.replace(/public/, 'http://localhost:3000')
            })
        })
    }
    render() {
        const {
            loginFlag,
            username,
            money,
            card,
            logoimg
        } = this.state
        return (
            <div>
                <Head title='个人中心' left={true} />
                <div className="personhead">
                    <img src={require('./img/mybgnew-20161111.jpg')} alt="" className="backgroundurl" />
                    <div className='usercontainer-in' style={{ display: loginFlag ? '' : 'none' }}>
                        <div className='logo'>
                            <img src={logoimg} alt="" className="userlogo" onClick={this.upLogo} />
                            <input type="file" accept="image/*" ref={el => this.fileinp = el} onChange={this.upImg} style={{ display: 'none' }} />
                        </div>
                        <div className="content">
                            <div className="article">
                                <p className='username'>{username}</p>
                                <p className='info'>hello world</p>
                            </div>
                            <div className="outbutton" onClick={this.outLogin}>
                                注销
                            </div>
                        </div>
                    </div>
                    <div className="usercontainer-out" style={{ display: loginFlag ? 'none' : '' }}>
                        <div className='logo'>
                            <img src={require('./img/avatar.png')} alt="" className="userlogo" />
                        </div>
                        <div className="content">
                            <p className='username' onClick={() => { this.props.history.push('/login') }}>登录</p>
                            <p className='info'>注册</p>
                        </div>
                    </div>
                </div>
                <WhiteSpace />
                <Card full>
                    <Card.Header
                        title="钱包"
                        thumb={<img src={require('./img/wallet.png')} style={{ width: '0.4rem' }} />}
                    />
                    <Card.Body>
                        <div className='mywallet'>
                            <div className="list">
                                <div className="title">
                                    {money}
                                </div>
                                <div className="content">
                                    账户余额
                                </div>
                            </div>
                            <div className="list">
                                <div className="title">
                                    0
                                </div>
                                <div className="content">
                                    星卷
                                </div>
                            </div>
                            <div className="list">
                                <div className="title">
                                    {card}
                                </div>
                                <div className="content">
                                    银行卡
                                </div>
                            </div>
                        </div>
                    </Card.Body>
                </Card>
                <WhiteSpace />
                <List>
                    {
                        middleList.map((item, i) => {
                            return (
                                <Item
                                    thumb={item.img}
                                    onClick={() => { this.onClick(item.type) }}
                                    arrow="horizontal"
                                    key={i}
                                >
                                    {item.txt}
                                </Item>
                            )
                        })
                    }

                </List>
                <WhiteSpace size='lg' />
                <List>
                    {
                        footerList.map((item, i) => {
                            return (
                                <Item
                                    thumb={item.img}
                                    onClick={() => { }}
                                    arrow="horizontal"
                                    key={i}
                                >
                                    {item.txt}
                                </Item>
                            )
                        })
                    }

                </List>
            </div>
        )
    }
}