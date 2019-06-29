import { EXCHANGE, CHANGEDATE, CHANGEFLAG, GETCITYLIST, CHANGECITYFLG, CHOOSETYPE, GETCITYCHANGE, GETTICKET,GETORDER, GETORDERCONTENT, FILTERLIST, HISTORYLIST, SAVEMOBILE} from "../actions";



const now = new Date()
const defaultState = {
    from: '北京',
    to: '武汉',
    date: now.getFullYear() + '-' + (now.getMonth() + 1 )+ '-' + now.getDate(),
    flag: false,
    cityList:{},
    citySwitch:false,
    choseType:'',
    ticketList:[],
    orderDetail:[],
    traintype:'',
    typename:'',
    ordercontent:{},
    historyList:[],
    mobile:''
}


export const reducers = (state = defaultState, action) => {


    switch (action.type) {

        case SAVEMOBILE:
            return{
                ...state,
                mobile:action.val
            }
            break;

        case HISTORYLIST:
            state.historyList.push(action.obj)
            return{
                ...state,
                historyList:state.historyList
            }
            break;

        case FILTERLIST:
            return {
                ...state,
                ticketList:state.ticketList.splice(1).reverse()
            }
            break;

        case GETORDERCONTENT:
            return {
                ...state,
                ordercontent:action.obj
            }
            break;

        case GETORDER:
            return {
                ...state,
                orderDetail:action.orderList.list,
                traintype:action.orderList.type,
                typename:action.orderList.typename
            }
            break;

        case GETTICKET:
            return {
                ...state,
                ticketList:action.list
            }
            break;

        case GETCITYCHANGE:
            if(state.choseType == 'from'){
                return{
                    ...state,
                    from:action.val
                }
            }else{
                return{
                    ...state,
                    to:action.val
                }
            }
            break;

        case CHOOSETYPE:
            return{
                ...state,
                choseType:action.ctype
            }
            break;

        case CHANGECITYFLG:
            return {
                ...state,
                citySwitch:!state.citySwitch
            }
            break;
        case GETCITYLIST:
            return{
                ...state,
                cityList:action.citylist
            }
            break;

        case CHANGEFLAG:
            return {
                ...state,
                flag: action.flag
            }
            break;

        case CHANGEDATE:
            return {
                ...state,
                date: action.date
            }
            break;

        case EXCHANGE:
            let obj = {
                from: state.to,
                to: state.from
            }
            return {
                ...state, ...obj
            }
            break;

        default:
            return state;
            break;
    }

}