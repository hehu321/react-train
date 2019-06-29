
import { NavBar,Icon} from 'antd-mobile'
import PropTypes from 'prop-types'
import history from '@/utils/history'

export class Head extends Component {

    render() {
        const {title,left} = this.props
        return (
            <div style={{width:'100%',height:"1rem"}}>
                <NavBar
                    mode="dark"
                    icon={left?<Icon type="left" />:''}
                    onLeftClick={() =>  history.goBack()}
                    style={{position:'fixed',top:0,left:0,width:'100%',zIndex:999}}
                >{title}</NavBar>
            </div>
        )
    }

}

Head.defaultProps = {
    left:false
}

Head.propTypes = {
    title:PropTypes.string.isRequired,
    left:PropTypes.bool
}

