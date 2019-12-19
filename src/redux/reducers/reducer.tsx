import { combineReducers } from 'redux'
import { img } from './img';
import { imgFilter } from './imgFilter';
import { settings } from './settings'

export default combineReducers({
    img,
    imgFilter,
    settings
})