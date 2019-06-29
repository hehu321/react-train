
import { Flex, WhiteSpace, Button, InputItem, WingBlank ,Toast} from 'antd-mobile'
import axios from '@/utils/axios'
import history from '@/utils/history'
var timer = null;
var mobileReg = /^1[3,5,6,7,8,9]\d{9}$/;
var codeReg = /^\d{4}$/
export class Message extends Component {
    state = {
        hasError: false,
        value: '',
        codetype: true,
        btntype: true,
        code: '',
        txt: '获取验证码',
        count: 60,
        flag: true,
        codeError:false
    }
    onErrorClick = () => {
        if (this.state.hasError) {
            Toast.info('请输入11位手机号');
        }
    }
    onErrorCode = ()=>{
        if(!this.state.codetype){
            Toast.info('请输入4位验证码');
        }
    }
    getCode = () => {
        var obj = { mobile: this.state.value }
        axios.post('react/getcode', obj).then(res => {
        })
        clearInterval(timer);
        timer = setInterval(() => {
            if (this.state.count > 0) {
                this.setState({
                    count: --this.state.count,
                    txt: this.state.count + 's',
                    codetype: true,
                    flag: false,
                })
            } else {
                this.setState({
                    count: 60,
                    txt: '获取验证码',
                    codetype: false,
                    flag: true
                })
                clearInterval(timer);
            }
        }, 1000)
    }
    onChange = (value) => {
        if (value.replace(/\s/g, '').length < 11) {
            this.setState({
                hasError: true,
                codetype: true,
                btntype: true
            });
        } else {
            var tel = value.replace(/\s/g, '')
            if (mobileReg.test(tel)) {
                this.setState({
                    hasError: false,
                    codetype: false,
                });

            } else {
                this.setState({
                    hasError: true,
                    codetype: true,
                });
            }
        }
        this.setState({
            value,
        });
    }
    onCode = (code) => {
        if(codeReg.test(code) && !this.state.hasError && this.state.value != ''){
            this.setState({
                btntype:false,
                codeError:false,
            })
        }else{
            this.setState({
                btntype:true,
                codeError:true
            })
        }
        this.setState({
            code
        })
    }
    goLogin = () => {
        var obj = {
            mobile: this.state.value,
            code: this.state.code
        }
        axios.post('react/login', obj).then(res => {
            if(res.data.token){
                localStorage.mobile = obj.mobile
                var pass = {token:res.data.token}
                sessionStorage.userInfo =  JSON.stringify(pass)
                history.go(-1)
            }
        })
    }
    render() {
        const {
            codetype,
            btntype,
            txt,
            flag
        } = this.state
        return (
            <div>
                <WhiteSpace/>
                <Flex>
                    <Flex.Item>
                        <InputItem
                            type="phone"
                            placeholder="请输入手机号"
                            error={this.state.hasError}
                            onErrorClick={this.onErrorClick}
                            onChange={this.onChange}
                            value={this.state.value}
                            style={{borderBottom:'1px dotted #000'}}
                        ></InputItem>
                    </Flex.Item>
                </Flex>
                <WhiteSpace/>
                <Flex>
                    <Flex.Item>
                        <InputItem
                            type="text"
                            placeholder="请输入验证码"
                            value={this.state.code}
                            onChange={this.onCode}
                            error={this.state.codeError}
                            onErrorClick={this.onErrorCode}
                            style={{borderBottom:'1px dotted #000'}}
                        ></InputItem>
                    </Flex.Item>
                    <Flex.Item>
                        <Button type="warning" disabled={flag ? codetype : true} onClick={this.getCode}  style={{width:'70%',float:'right'}}>{txt}</Button>
                    </Flex.Item>
                </Flex>
                <WhiteSpace />
                <Button type="primary" disabled={btntype} onClick={this.goLogin} >登录</Button>
                <WhiteSpace /> 
            </div>
        )
    }

}