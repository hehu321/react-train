

import './index.scss'
import { Switch, List, NavBar, Icon, InputItem,WhiteSpace,Picker} from 'antd-mobile';
import {Hpicker} from '../picker'
let timer = null;
const CustomChildren = props => (
    <div
      onClick={props.onClick}
      style={{ backgroundColor: '#fff', paddingLeft: 15 }}
    >
      <div className="test" style={{ display: 'flex', height: '45px', lineHeight: '45px' }}>
        <div style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{props.children}</div>
        <div style={{ textAlign: 'right', color: '#888', marginRight: 15 }}>{props.extra}</div>
      </div>
    </div>
  );
export class Adress extends Component {
    state = {
        checked: false,
    }
    openAddress=()=>{
        clearInterval(timer)
        if(this.addresspage.className == 'hide'){
            this.addresspage.className = 'adresspage-in'
        }
        else{
            this.addresspage.className = 'adresspage-out'
            timer = setInterval(()=>{
                this.addresspage.className = 'hide'
                clearInterval(timer)
            },1000)
        }
    }
    saveAddress=()=>{
        this.openAddress()
    }
    render() {
        let antdDistrict =[];
        let districtData = require('./localtion/index.json');
        Object.keys(districtData).forEach((index)=>{
            let itemLevel1 ={};
            let itemLevel2 ={};
            itemLevel1.value = districtData[index].code;
            itemLevel1.label = districtData[index].name;
            itemLevel1.children = [];
            let data = districtData[index].cities;
            Object.keys(data).forEach((index)=>{
                itemLevel2.value = data[index].code;
                itemLevel2.label = data[index].name;
                itemLevel2.children = [];
                let data2 = data[index].districts;
                let itemLevel3 ={};
                itemLevel3.children = [];
                Object.keys(data2).forEach((index)=>{
                    itemLevel3.value = index;
                    itemLevel3.label = data2[index];
                    itemLevel2.children.push(itemLevel3);
                    itemLevel3 ={};
                });
                itemLevel1.children.push(itemLevel2);
                itemLevel2 ={};
            });
            antdDistrict.push(itemLevel1)
        });
        const {
            checked,
        } = this.state
        return (
            <div>
                <List.Item
                    extra={<Switch
                        checked={this.state.checked}
                        onChange={() => {
                            this.setState({
                                checked: !this.state.checked,
                            });
                        }}
                        platform="ios"
                    />}
                >
                    <div className="addressSwitch">
                        <div className="icon iconfont icon-shandian"></div>
                        <div className="content">
                            <div className="title">快递送票</div>
                            <div className="article">免身份核验 无须火车站排队取票</div>
                        </div>
                    </div>
                </List.Item>
                <List.Item
                    thumb={require('./img/express.png')}
                    arrow="horizontal"
                    style={{ display: checked ? '' : 'none' }}
                    onClick={() => { this.openAddress()}}
                >请填写配送地址
                </List.Item>
                <div className='hide' ref={el=>this.addresspage=el}>
                    <NavBar
                        mode="dark"
                        onLeftClick={() => this.openAddress()}
                        icon={<Icon type="left" />}
                    >填写收票地址</NavBar>
                    <WhiteSpace/>
                    <InputItem
                        placeholder="必填"
                    >收件人</InputItem>
                    <InputItem
                        placeholder="用于接收取票通知"
                    >联系手机</InputItem>
                    <WhiteSpace/>
                    <Picker
                    title="选择地区"
                    extra="请选择"
                    data={antdDistrict}
                    value={this.state.pickerValue}
                    onChange={v => this.setState({ pickerValue: v })}
                    onOk={v => {this.setState({ pickerValue: v })}}
                    onClick={()=>{console.log(this.state.pickerValue)}}
                    >
                    <CustomChildren>配送地址</CustomChildren>
                </Picker>
                <InputItem
                        placeholder="越详细越快"
                >详细地址</InputItem>
                <WhiteSpace/>
                <Hpicker  title='配送方式' datalist={['顺丰快递','圆通快递','京东快递','中通快递','申通快递','邮政快递']} />
                        <div className='savebutton' onClick={this.saveAddress}>
                            保存
                        </div>
                </div>
            </div>
        )
    }
}