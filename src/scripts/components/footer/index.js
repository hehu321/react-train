import { TabBar, Modal, List, Range, Badge } from 'antd-mobile'
import './index.scss'
import { connect } from 'react-redux'
import { getTicketList, filterList } from '../../actions';

const foots = [
    { title: '出发 早→晚', icon: 'iconfont icon-time', color: "#33A3F4" },
    { title: '只看高铁动车', icon: 'iconfont icon-huoche', color: "#33A3F4" },
    { title: '只看有票', icon: 'iconfont icon-piao', color: "#33A3F4" },
    { title: '综合筛选', icon: 'iconfont icon-shaixuan', color: "#33A3F4" },
]

function closest(el, selector) {
    const matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
    while (el) {
        if (matchesSelector.call(el, selector)) {
            return el;
        }
        el = el.parentElement;
    }
    return null;
}

@connect(
    state => {
        return {
            ...state
        }
    },
    dispatch => {
        return {
            getTicketList: ({ url, params }) => { dispatch(getTicketList({ url, params })) },
            filterList:()=>{dispatch(filterList())}
        }
    }
)
export class Footer extends Component {
    state = {
        fullScreen: false,
        modal2: false,
        GtrainType: false,
        DtrainType: false,
        KtrainType: false,
        ZtrainType: false,
        show:false,
        timeFlag:false
    }
    shadow = (key) => {
        if (key == '综合筛选') {
            this.setState({
                modal2: true,
            })
        } else if (key == '只看高铁动车') {
            let url = '/train/station2s';
            let params = {
                appkey: 'cc553c99d092df9c',
                start: this.props.from,
                end: this.props.to,
                ishigh: !this.state.show ? 1 : 0,
            }
            this.props.getTicketList({url,params})
            this.setState({
                show:!this.state.show
            })
        }else if(key == '出发 早→晚'){
            this.props.filterList()
            this.setState({
                timeFlag:!this.state.timeFlag
            })
        }
        else {
            return false
        }
    }

    onClose = key => () => {
        this.setState({
            [key]: false,
        });
    }
    onWrapTouchStart = (e) => {
        // fix touch to scroll background page on iOS
        if (!/iPhone|iPod|iPad/i.test(navigator.userAgent)) {
            return;
        }
        const pNode = closest(e.target, '.am-modal-content');
        if (!pNode) {
            e.preventDefault();
        }
    }
    getstation = () => {
        var list = [];
        this.props.ticketList.forEach((item) => {
            if (list.indexOf(item.station) === -1) {
                list.push(item.station)
            }
        })
        return list
    }
    getendstation = () => {
        var list = [];
        this.props.ticketList.forEach((item) => {
            if (list.indexOf(item.endstation) === -1) {
                list.push(item.endstation)
            }
        })
        return list
    }
    log = (name) => {
        return (value) => {
            // console.log(`${name}: ${value}`);
        };
    };
    render() {
        return (
            <div style={{ width: '100%', height: '1rem' }}>
                <div style={{ position: 'fixed', bottom: 0, left: 0, width: '100%' }}>
                    <TabBar
                        barTintColor="white"
                    >
                        {
                            foots.map((item, i) => {
                                return (
                                    <TabBar.Item
                                        onPress={() => { this.shadow(item.title) }}
                                        title={item.title=='出发 早→晚'?this.state.timeFlag?'出发 早→晚':'耗时 短→长':item.title}
                                        key={i}
                                        badge={item.title=='只看高铁动车'?this.state.show?'√':'':''}
                                        icon={<i style={{
                                            width: '25px',
                                            height: '25px',
                                            display: 'block',
                                            color: item.color
                                        }}
                                            className={item.icon}
                                        />
                                        }
                                    >
                                    </TabBar.Item>
                                )
                            })
                        }
                    </TabBar>
                    <Modal
                        popup
                        visible={this.state.modal2}
                        onClose={this.onClose('modal2')}
                        animationType="slide-up"
                    >
                        <div className='buttongroup'>
                            <div className="button-reset">重置</div>
                            <div className="button-confirm">确认</div>
                        </div>
                        <List renderHeader={() => <div style={{ textAlign: 'left' }}>车次类型</div>}>
                            <ul className="warp">
                                <li className={this.state.GtrainType ? 'selected' : ''} onClick={() => { this.setState({ GtrainType: !this.state.GtrainType }) }}>
                                    G-高速动车
                                </li>
                                <li className={this.state.DtrainType ? 'selected' : ''} onClick={() => { this.setState({ DtrainType: !this.state.DtrainType }) }}>
                                    D-动车组
                                </li>
                                <li className={this.state.KtrainType ? 'selected' : ''} onClick={() => { this.setState({ KtrainType: !this.state.KtrainType }) }}>
                                    K-快速
                                </li>
                                <li className={this.state.ZtrainType ? 'selected' : ''} onClick={() => { this.setState({ ZtrainType: !this.state.ZtrainType }) }}>
                                    Z-直达特快
                                </li>
                            </ul>
                        </List>
                        <List renderHeader={() => <div style={{ textAlign: 'left' }}>出发站</div>}>
                            <ul className="warp">
                                {
                                    this.getstation().map((item, i) => {
                                        return (
                                            <li
                                                className=''
                                                key={i}
                                                ref={el => this['station' + i] = el}
                                                onClick={() => { this['station' + i].className = this['station' + i].className ? '' : 'selected' }}
                                            >
                                                {item}
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </List>
                        <List renderHeader={() => <div style={{ textAlign: 'left' }}>到达站</div>}>
                            <ul className="warp">
                                {
                                    this.getendstation().map((item, i) => {
                                        return (
                                            <li
                                                className=''
                                                key={i}
                                                ref={el => this['endstation' + i] = el}
                                                onClick={() => { this['endstation' + i].className = this['endstation' + i].className ? '' : 'selected' }}
                                            >
                                                {item}
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </List>
                        <List renderHeader={() => <div style={{ textAlign: 'left' }}>出发时间</div>}>

                            <Range
                                style={{ marginLeft: 30, marginRight: 30, marginTop: 20, height: 30 }}
                                min={0}
                                max={24}
                                defaultValue={[0, 24]}
                                onChange={this.log('change')}
                                onAfterChange={this.log('afterChange')}
                            />

                        </List>
                        <List renderHeader={() => <div style={{ textAlign: 'left' }}>到达时间</div>}>
                            <Range
                                style={{ marginLeft: 30, marginRight: 30, marginTop: 20, height: 30 }}
                                min={0}
                                max={24}
                                defaultValue={[0, 24]}
                                onChange={this.log('change')}
                                onAfterChange={this.log('afterChange')}
                            />
                        </List>

                    </Modal>
                </div>
            </div>
        )
    }
}