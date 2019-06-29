import './index.scss';

let timer = null;
let flag = true;
export class Hpicker extends Component {
    state = {
        defaultValue: this.props.defaultValue,
    }
    openPicker = () => {
        if (flag) {
            flag = false;
            clearInterval(timer)
            if (this.Hpicker.className === 'hide') {
                this.Hpicker.className = 'HpickerShadow-in'
                timer = setInterval(() => {
                    flag = true;
                    clearInterval(timer)
                }, 1000)

            } else {
                this.Hpicker.className = 'HpickerShadow-out'
                timer = setInterval(() => {
                    flag = true;
                    this.Hpicker.className = 'hide'
                    clearInterval(timer)
                }, 1000)
            }
        }
    }
    ChooseValue = (val)=>{
        this.setState({
            defaultValue:val
        })
        this.openPicker()
    }
    render() {
        const {
            title,
            datalist
        } = this.props
        const {
            defaultValue
        } = this.state
        return (
            <div>
                <div className='Hpicker' onClick={this.openPicker}>
                    <div className="title">
                        {title}
                    </div>
                    <div className="content">
                        {defaultValue}
                    </div>
                    <div className='iconfont icon-jiantou1 icon'>

                    </div>
                </div>
                <div className='hide' ref={el => this.Hpicker = el}>
                    <div className="header" onClick={this.openPicker}>
                        ×
                    </div>
                    {
                        datalist.map((item, i) => {
                            return (
                                <div className="list" 
                                key={i} 
                                style={{ color: item == defaultValue ? '#108ee9' : ' #666' }}
                                onClick={()=>{this.ChooseValue(item)}}
                                >
                                    {item}
                                </div>
                            )
                        })
                    }

                </div>
            </div>

        )
    }
}
Hpicker.defaultProps = {
    defaultValue: "请选择"
}