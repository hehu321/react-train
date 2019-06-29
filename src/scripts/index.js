
import ReactDom, {render} from 'react-dom'

import {Provider} from 'react-redux'

import store from './store'

import  {View} from './view'

const hotRender = () =>{
    render(
        <Provider store={store}>
            <View/>
        </Provider>,
        document.getElementById('app')
    )
}
hotRender()