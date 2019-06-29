
import { Flex, WhiteSpace, List, SearchBar, NavBar, Icon, Toast } from 'antd-mobile'
import { connect } from 'react-redux'
import { changeCitySwitch, getCityChange } from '../../actions';
import './index.scss'
import axios from '@/utils/axios.js'

const Item = List.Item;
const PlaceHolder = (props) => (
    <div className={`${props.className}`} onClick={() => props.changeCity(props.city)}>{props.city}</div>
);


@connect(
    state => {
        return {
            cityList: state.cityList,
            citySwitch: state.citySwitch
        }
    },
    dispatch => {
        return {
            changeCitySwitch: () => { dispatch(changeCitySwitch()) },
            getCityChange: (val) => { dispatch(getCityChange(val)) }
        }
    }
)
export class CityList extends Component {
    state = {
        stationList: [],
        value: ''
    }
    changeCity = (val) => {
        this.props.changeCitySwitch()
        this.props.getCityChange(val)
        this.setState({
            stationList: [],
            value: ''
        })
        if (localStorage.list) {
            var list = JSON.parse(localStorage.list)
            var flag = list.some((item) => {
                return item.name == val
            })
            if (!flag) {
                list.push({ name: val })
            }
        } else {
            var list = [];
            list.push({ name: val })
        }
        var str = JSON.stringify(list)
        localStorage.list = str
    }
    goFloor = (id, item) => {
        document.getElementById(id).scrollIntoView({block: "start", behavior: "smooth"})
        Toast.info(item, 1)
    }
    goSearch = (val) => {
        this.setState({
            value: val
        })
        axios.get('/react/stationlist', {
            params: { search: val }
        }).then(res => {
            this.setState({
                stationList: res.data.result
            })
        })
    }
    render() {
        const {
            hotCities,
            cityList
        } = this.props.cityList
        const {
            citySwitch,
            changeCitySwitch
        } = this.props
        const {
            stationList,
            value
        } = this.state
        const list = localStorage.list ? JSON.parse(localStorage.list) : []
        return (
            <div className={citySwitch ? 'flex-container-in' : 'flex-container-out'}>
                <div>
                    <NavBar
                        style={{ position: 'fixed', top: 0, left: 0, zIndex: 2, width: '100%' }}
                        mode="dark"
                        icon={<Icon type="left" />}
                        onLeftClick={() => changeCitySwitch()}
                    >城市选择</NavBar>
                    <SearchBar
                        placeholder="Search"
                        maxLength={8}
                        style={{ marginTop: '1rem' }}
                        onChange={this.goSearch}
                        value={value}
                    />
                    <List>
                        {
                            stationList.map((item, i) => {
                                return (
                                    <Item key={i} onClick={() => { this.changeCity(item.station) }}>{item.station}</Item>
                                )
                            })
                        }
                    </List>
                    <div className='floor'>
                        <div onClick={() => { this.goFloor('history','历史记录') }}>
                            历史
                        </div>
                        <div  onClick={() => { this.goFloor('hotcity', '热门城市') }}>
                            热门
                        </div>
                        {
                            cityList && cityList.map((item, i) => {
                                return (
                                    <div key={i} onClick={() => { this.goFloor(i + item.title, item.title) }}>
                                        {item.title}
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="sub-title" id="history">历史记录</div>
                    <Flex wrap="wrap">
                        <PlaceHolder className="inline" city='定位' />
                        {
                            list && list.map((item, i) => {
                                return (
                                    <PlaceHolder className="inline" city={item.name} key={i} changeCity={this.changeCity} />
                                )
                            })
                        }
                    </Flex>
                    <WhiteSpace size="lg" />
                    <div className="sub-title" id="hotcity">热门城市</div>
                    <Flex wrap="wrap">
                        {
                            hotCities && hotCities.map((item, i) => {
                                return (
                                    <PlaceHolder className="inline" city={item.name} key={i} changeCity={this.changeCity} />
                                )
                            })
                        }
                    </Flex>
                    <WhiteSpace size="lg" />
                    {
                        cityList && cityList.map((item, i) => {
                            return (
                                <List renderHeader={() => item.title} className="my-list" key={i} id={i + item.title}>
                                    {item.citys && item.citys.map((a, b) => {
                                        return (
                                            <Item key={b} onClick={() => { this.changeCity(a.name) }}>{a.name}</Item>
                                        )
                                    })}
                                </List>
                            )
                        })
                    }
                </div>

            </div>
        )
    }
}