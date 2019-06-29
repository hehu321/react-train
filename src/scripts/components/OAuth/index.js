
import {InputItem,Flex,WhiteSpace,Button,WingBlank} from 'antd-mobile'

export class OAuth extends Component{


    render(){
        return (
            <div>
                <WingBlank>
                    <WhiteSpace/>
                    <InputItem
                        type='text'
                        placeholder='请输入用户名'
                    >用户名</InputItem>
                    <WhiteSpace/>
                    <WhiteSpace/>
                    <InputItem
                        type='text'
                        placeholder='请输入密码'
                    >密码</InputItem>
                    <WhiteSpace/>
                    <WhiteSpace/>
                    <Button type='primary'>登录</Button>
                    <WhiteSpace/>
                    <Button type='warning'>注册</Button>
                    <WhiteSpace/>
                </WingBlank>
            </div>
        )
    }
}