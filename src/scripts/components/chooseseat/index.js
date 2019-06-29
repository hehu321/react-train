import './index.scss'
import { Toast } from 'antd-mobile'
import { Hpicker } from "../../components/picker";
import { CarFoot } from "../../components/carfoot";
import { SeatList } from "../../components/seatlist";
let timer = null;
let flag = true;
let stateNum = 0;
export default class ChooseSeat extends Component {
    state = {
        Passenger: [],
        Childs: [],
        totalPrice:'0',
        personNum:'0',
        maxNum:0,
        selectNum:0,
    }
    changeselectNum=(type)=>{
        if(type){
            this.setState({
                selectNum:++this.state.selectNum
            })
        }else{
            this.setState({
                selectNum:--this.state.selectNum
            })
        }
    }
    addPassenger = () => {
   
        if (this.state.Passenger.length == 0) {
            this.state.Passenger.push({ type: 'person', name: '', id: '' ,typename:'成人票'})
            this.setState({
                Passenger: this.state.Passenger,
                maxNum:++this.state.maxNum
            })
        } else {
            var num = this.state.Passenger.length - 1;
            if (this.state.Passenger[num].name != '' && this.state.Passenger[num].id != '') {
                this.state.Passenger.push({ type: 'person', name: '', id: '',typename:'成人票' })
                this.setState({
                    Passenger: this.state.Passenger,
                    maxNum:++this.state.maxNum
                })

            } else {
                Toast.info('请正确填写信息', 1)
            }
        }
        this.countPrice()
    }
    addChild = () => {
        if (this.state.Passenger.length == 0) {
            Toast.info('请添加同行成人', 1)
        } else {
            if (this.state.Passenger[0].name != '' && this.state.Passenger[0].id != '') {
                this.state.Childs.push({ type: 'child', name: '', birthday: '', sex: '', person: '' })
                this.setState({
                    Childs: this.state.Childs,
                    maxNum:++this.state.maxNum
                })
            } else {
                Toast.info('请正确填写成人信息', 1)
            }
        }
        this.countPrice()
    }
    onChange = (el, type, item) => {
        if (type == 'name') {
            this.state.Passenger[item].name = this[el].value
            this.setState({
                Passenger: this.state.Passenger
            })
        }
        if (type == 'id') {
            this.state.Passenger[item].id = this[el].value
            this.setState({
                Passenger: this.state.Passenger
            })
        }
    }
    onDelete(type, item) {
        if (type == 'person') {
            this.state.Passenger.splice(item, 1)
            this.setState({
                Passenger: this.state.Passenger,
                maxNum:--this.state.maxNum
            })
            console.log(this.state.maxNum)
            if(this.state.maxNum == 0){
                this.setState({
                    selectNum:0
                })
            }
        }
        if (type == 'child') {
            this.state.Childs.splice(item, 1)
            this.setState({
                Childs: this.state.Childs,
                maxNum:--this.state.maxNum
            })
            if(this.state.maxNum == 0){
                this.setState({
                    selectNum:0
                })
            }
        }
    }
    onChildChange(el, type, item) {
        if (type == 'name') {
            this.state.Childs[item].name = this[el].value
            this.setState({
                Childs: this.state.Childs
            })
        }
        if (type == 'sex') {
            this.state.Childs[item].sex = this[el].value
            this.setState({
                Childs: this.state.Childs
            })
        }
        if (type == 'person') {
            this.state.Childs[item].person = this[el].value
            this.setState({
                Childs: this.state.Childs
            })
        }
        if (type == 'bir') {
            this.state.Childs[item].birthday = this[el].value
            this.setState({
                Childs: this.state.Childs
            })
        }
    }
    openPicker = () => {
        if (flag) {
            flag = false;
            clearInterval(timer)
            if (this.Tpicker.className === 'hide') {
                this.Tpicker.className = 'HpickerShadow-in'
                timer = setInterval(() => {
                    flag = true;
                    clearInterval(timer)
                }, 1000)

            } else {
                this.Tpicker.className = 'HpickerShadow-out'
                timer = setInterval(() => {
                    flag = true;
                    this.Tpicker.className = 'hide'
                    clearInterval(timer)
                }, 1000)
            }
        }
    }
    keyState(val){
        stateNum = val;
    }
    ChooseValue = (val)=>{
        this.state.Passenger[stateNum].typename = val;
        this.setState({
            Passenger:this.state.Passenger
        })
        this.openPicker()
    }
    countPrice = ()=>{
        const {
            seatPrice,
        } = this.props;
        const{
            Passenger,
            Childs
        } = this.state;
        this.setState({
            totalPrice:(Passenger.length + Childs.length)*seatPrice,
            personNum:(Passenger.length + Childs.length)
        })
    }
    render() {
        const {
            Passenger,
            Childs,
            maxNum,
            selectNum
        } = this.state

        return (
            <div className='ChooseSeat'>
                {
                    Passenger && Passenger.map((item, i) => {
                        return (
                            <div className='passenger' key={i}>
                                <div className="delete" onClick={() => {this.onDelete(item.type, i);this.countPrice()}}>
                                    一
                                </div>
                                <ul className="content">
                                    <li>
                                        <label htmlFor="username">姓名</label>
                                        <input
                                            name="username"
                                            placeholder='乘客姓名'
                                            ref={el => this['name' + i] = el}
                                            value={item.name}
                                            onChange={() => { this.onChange(('name' + i), 'name', i) }}
                                        />

                                        <span htmlFor="username" onClick={()=>{this.openPicker();this.keyState(i)}}>{item.typename}</span>
                                        <span className='iconfont icon-jiantou'></span>
                                    </li>
                                    <li>
                                        <label htmlFor="username">身份证</label>
                                        <input
                                            value={item.id}
                                            name="username"
                                            ref={el => this['id' + i] = el}
                                            onChange={() => { this.onChange(('id' + i), 'id', i) }}
                                            placeholder='证件号码'
                                             />
                                    </li>
                                </ul>
                            </div>
                        )
                    })
                }
                {
                    Childs && Childs.map((item, i) => {
                        return (
                            <div className='childs' key={i}>
                                <div className="delete" onClick={() => { this.onDelete(item.type, i);this.countPrice() }}>
                                    一
                                </div>
                                <ul className="content">
                                    <li>
                                        <label htmlFor="username">姓名</label>
                                        <input
                                            name="username"
                                            placeholder='乘客姓名'
                                            ref={el => this['Cname' + i] = el}
                                            value={item.name}
                                            onChange={() => { this.onChildChange(('Cname' + i), 'name', i) }}
                                        />
                                    </li>
                                    <li>
                                        <Hpicker title='性别' datalist={['男','女']} />
                                    </li>
                                    <li>
                                        <label htmlFor="username">出生日期</label>
                                        <input
                                            name="username"
                                            placeholder='如 19950224'
                                            ref={el => this['Cbir' + i] = el}
                                            value={item.birthday}
                                            onChange={() => { this.onChildChange(('Cbir' + i), 'bir', i) }}
                                        />
                                    </li>
                                    <li>
                                        <label htmlFor="username">同行成人</label>
                                        <input
                                            name="username"
                                            ref={el => this['Cperson' + i] = el}
                                            onChange={() => { this.onChildChange(('Cperson' + i), 'person', i) }}
                                            value={item.person}
                                        />
                                    </li>
                                </ul>
                            </div>
                        )
                    })
                }
                <div className="main">
                    <div className="addPassenger" onClick={this.addPassenger}><span>添加成人</span></div>
                    <div className="addChild" onClick={this.addChild}><span>添加儿童</span></div>
                </div>
                <SeatList maxNum={maxNum} selectNum={selectNum} changeselectNum={this.changeselectNum}/>
                <div className='hide' ref={el => this.Tpicker = el}>
                    <div className="header" onClick={this.openPicker}>
                        ×
                    </div>
                    {
                        ['成人票','学生票','儿童票'].map((item, i) => {
                            return (
                                <div className="list" 
                                key={i} 
                                style={{ color: this.state.Passenger[stateNum]&&this.state.Passenger[stateNum].typename== item ? '#108ee9' : ' #666' }}
                                onClick={()=>{this.ChooseValue(item)}}
                                >
                                    {item}
                                </div>
                            )
                        })
                    }
                </div>

                <div className="agreement">
                点击提交订单表示已阅读并同意 <span style={{color:'#108ee9'}}>《预订须知》</span>,
                <span style={{color:'#108ee9'}}>《火车票服务协议》</span>
                出票方：北京津渡远游信息技术有限公司 <span style={{color:'#108ee9'}}>工商执照信息</span>
                
                </div>
                <CarFoot  {...this.state}/>
            </div>
        )
    }
}