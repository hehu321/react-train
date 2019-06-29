
import './index.scss'


export class TrainList extends Component {
    onClose = (e)=>{
        var e = e||window.event;
        if(e.target.className == 'dialog'){
            this.props.changFlag()
        }
    }
    render() {
        const {
            orderDetail,
        } = this.props
        return (
            <div className='dialog' onClick={this.onClose} style={{display:this.props.tarinflag?'flex':'none'}}>
                <div className="box">
                    <h1 className="title">
                        列车时刻表
                    </h1>
                    <div className="headnav">
                        <div className="content">
                            <span className='station'>
                                车站
                            </span>
                            <span>到达</span>
                            <span>发车</span>
                            <span>停留时间</span>
                        </div>
                    </div>
                    <div className="listmain">
                        <ul>
                            {
                                orderDetail.map((item, i) => {
                                    return (
                                        <li key={i}>
                                            <div className="icon">{i+1}</div>
                                            <div className='maincontent'>
                                                <span className='station'>
                                                    {item.station}
                                                    </span>
                                                <span>{item.arrivaltime}</span>
                                                <span>{item.departuretime}</span>
                                                <span style={{textAlign:'center'}}>{item.stoptime}</span>
                                            </div>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </div>
            </div>
        )
    }

}