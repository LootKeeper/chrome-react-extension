import { combineReducers } from 'redux'
import { images } from './images';
import { imagesFilter } from './imagesFilter';
import { settings } from './settings'

export default combineReducers({
    images: images,
    imagesFilter: imagesFilter,
    settings
})