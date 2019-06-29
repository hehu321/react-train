import './index.scss'


export class SeatList extends Component {
    state = {
        seatList:[]
    }
    getItems = () => {
        var list = [];
        for (var i = 0; i < this.props.maxNum; i++) {
            list.push(i)
        }
        return list;
    }
    onSelect=(e)=>{
        var maxnum = this.props.maxNum;
        var selectnum = this.props.selectNum;
        var e = e || window.event;
        var parent = e.target.parentNode; 
        if(parent.className == 'seats'){
            if(selectnum<maxnum){
                this.state.seatList.push(parent.getAttribute('data-id'))
                this.setState({
                    seatList: this.state.seatList
                })
               this.props.changeselectNum(true)
                parent.className = 'selected'
            }
        }else if(parent.className == 'selected'){
            parent.className = 'seats'
            var list = this.state.seatList.filter(item=> item != parent.getAttribute('data-id'))
            this.setState({
                seatList: list
            })
            this.props.changeselectNum(false)
        }
    }
    render() {
        const {
            maxNum,
            selectNum,
            
        } = this.props
        return (
            <div className='SeatList' style={{display:maxNum==0?'none':''}}>
                <div className="header">
                    <div className="left">
                        在线选座
                    </div>
                    <div className="right">
                        <span className='selected'>{selectNum}</span>
                        <span>/{maxNum}</span>
                    </div>
                </div>
                {
                    this.getItems().map((item, i) => {
                        return (
                            <div className="seatcontainer" key={i}>
                                <div className="text">
                                    窗
                                </div>
                                <div className="seats" onClick={this.onSelect} data-id={(i+1)+'A'}>
                                    <div className="seat iconfont icon-zuowei"></div>
                                    <div className="tip">A</div>
                                </div>
                                <div className="seats" onClick={this.onSelect} data-id={(i+1)+'B'}>
                                    <div className="seat iconfont icon-zuowei" ></div>
                                    <div className="tip">B</div>
                                </div>
                                <div className="seats" onClick={this.onSelect} data-id={(i+1)+'C'}>
                                    <div className="seat iconfont icon-zuowei"></div>
                                    <div className="tip">C</div>
                                </div>
                                <div className="text">
                                    过道
                                </div>
                                <div className="seats" onClick={this.onSelect} data-id={(i+1)+'D'}>
                                    <div className="seat iconfont icon-zuowei"></div>
                                    <div className="tip">D</div>
                                </div>
                                <div className="seats" onClick={this.onSelect} data-id={(i+1)+'F'}>
                                    <div className="seat iconfont icon-zuowei"></div>
                                    <div className="tip">F</div>
                                </div>
                                <div className="text">
                                    窗
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        )
    }

}