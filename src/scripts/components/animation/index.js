
import './index.scss'
export class AnimationCan extends Component{
    render(){
        const{
            flag
        }= this.props
        return(
            <div className='AnimationCan' style={{display:flag?'':'none'}}>
                <div className='centerbox'>
                    <img src={require('./img/timg.gif')} alt=""/>
                </div>
            </div>
        )
    }
}