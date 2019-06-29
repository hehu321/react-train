import { Head } from "../../components/head";

import { Tabs, WhiteSpace, Badge } from 'antd-mobile'
import { Message } from "../../components/message";
import { OAuth } from "../../components/OAuth";

const tabs = [
    { title: '短信登录'},
    { title: '账号登录'},
  ];
  

export class Login extends Component {

    render() {
        return (
            <div>
                <Head title='登录' left={true} />
                <div>
                    <Tabs tabs={tabs}
                        initialPage={0}                       
                    >
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center',backgroundColor: '#fff' }}>
                            <Message/>
                        </div>
                        <div style={{backgroundColor:'#fff'}}>
                            <OAuth/>
                        </div>
                    </Tabs>
                    <WhiteSpace />
                </div>
            </div>
        )
    }
}