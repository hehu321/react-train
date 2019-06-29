
import { connect } from "react-redux"
import { Head } from "../../components/head";
import { Footer } from "../../components/footer";
import { Mylist } from "../../components/list";
import { getTicketList } from "../../actions";
import { DatePicker } from "../../components/datepicker";


@connect(
    state => {
        return {
            ...state
        }
    },
    dispatch=>{
        return{
            getTicketList:({url,params}) =>{dispatch(getTicketList({url,params}))}
        }
    }
)
export class TicketList extends Component {
    componentWillMount(){
        let url = '/train/station2s';
        let params = {
            appkey:'cc553c99d092df9c',
            start:this.props.from,
            end:this.props.to,
            ishigh:this.props.flag?1:0,
            date:this.props.date    
        }
        this.props.getTicketList({url,params})
    }
    render() {
        const {
            from,
            to,
            ticketList
        } = this.props
        return (
            <div style={{backgroundColor:'#fff'}} >
                <Head title={from + '⇀' + to} left={true} />
                <DatePicker/>
                {
                    ticketList.map((item,i)=>{
                        return(
                            <Mylist {...item} key={i} />
                        )
                    })
                }
                <Footer/>
            </div>
        )
    }
}