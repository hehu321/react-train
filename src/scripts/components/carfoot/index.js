
import './index.scss'
import {connect} from 'react-redux'
import {Toast} from 'antd-mobile'
import { changeHistoryList } from '../../actions';
import history from '@/utils/history'
import { AnimationCan } from "../../components/animation";

@connect(
    state=>{
        return{
            ordercontent: state.ordercontent,
            historyList:state.historyList,
            mobile:state.mobile
        }
    },
    dispatch=>{
        return{
            changeHistoryList:(obj)=>{dispatch(changeHistoryList(obj))}
        }
    }
)
export class CarFoot extends Component{
    state={
        flag:false
    }
    addOrder=()=>{
        const {
            Passenger,
            totalPrice,
            personNum,
            ordercontent,
            Childs,
            changeHistoryList,
            mobile
        } = this.props
     
       let pflag = Passenger.every((item)=>(item.name != ''&& item.id != ''))
       let cflag = Childs.every((item)=>(item.name != ''&& item.birthday !=''&&item.person!=''))
       pflag = Passenger.length==0?false:pflag;
       cflag = Childs.length==0?true:cflag;
       if(pflag&&cflag){
           if(Childs.length==0){
            var obj = {ordercontent,totalPrice,personNum,Passenger,mobile}
           }else{
            var obj = {ordercontent,totalPrice,personNum,Passenger,Childs,mobile} 
           }
           if(mobile !=''){
            changeHistoryList(obj)
            if(localStorage.historyList){
                var list = JSON.parse(localStorage.historyList)
                 list.push(obj)
                 localStorage.historyList = JSON.stringify(list);
            }else{
                 var list = [obj]
                 localStorage.historyList = JSON.stringify(list)
            }
            
            Toast.info('正在生成信息',1)
            this.setState({
                flag:true
            })
            setTimeout(()=>{
                this.setState({
                    flag:false
                })
                history.push('/app/myorder')
            },3000)
           }else{
            Toast.fail('请正确填写手机号',1)
           }
       }else{
            Toast.fail('请正确填写乘客信息',1)
       }
    }

    render(){
        const {
            totalPrice,
            personNum
        }=this.props
        const {
            flag
        } = this.state
        return(
            <div style={{height:'1.5rem'}}>
                <div className='CarFoot'>
                <div className="money">
                    <div className="number">
                        ¥{totalPrice}
                    </div>
                    <div className="tipmoney">
                        支付金额
                    </div>
                </div>
                <div className="paybutton" onClick={this.addOrder}>
                    提交订单
                </div>
            </div>
            <AnimationCan flag={flag}/>
            </div>
        )
    }
}
CarFoot.defaultProps = {
    price:0,
}