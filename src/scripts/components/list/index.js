import './index.scss'
import history from '@/utils/history'

export class Mylist extends Component {

    render() {
        const{
            trainno,
            station,
            endstation,
            departuretime,
            arrivaltime,
            costtime,
            priceed
        }=this.props

        return (
            <li className='mylist' onClick={()=>{history.push({pathname:'/app/order/'+trainno+'/'+station+'/'+endstation+'/'+departuretime+'/'+arrivaltime+'/'+costtime})}}>
                <div className='list-item'>
                    <div className="list-child">
                        {departuretime}
                    </div>
                    <div className="list-child">
                        <span className="mark">{arrivaltime}</span>
                    </div>
                </div>
                <div className='list-item'>
                    <div className="list-child">
                        <i className="iconfont icon-qidian" style={{color:'#3cc',fontSize:'20px'}}></i>
                        <span>{station}</span>
                    </div>
                    <div className="list-child">
                        <i className="iconfont icon-zhongdian" style={{color:'#39c381',fontSize:'20px'}}></i>
                        <span className="mark">{endstation}</span>
                    </div>
                </div>
                <div className='list-item'>
                    <div className="list-child">
                        {trainno}
                    </div>
                    <div className="list-child">
                        <span className="mark">{costtime}</span>
                    </div>
                </div>
                <div className='list-item'>
                    <div className="list-child">
                        {priceed?('¥'+priceed):'¥666'}
                    </div>
                    <div className="list-child">
                        <span className="mark" style={{fontSize:'12px'}}>一等座100张</span>
                    </div>
                </div>
            </li>
        )
    }

}