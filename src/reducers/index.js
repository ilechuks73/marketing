import { combineReducers } from 'redux';
import services from './service'
import featured from './featured'
import testimonials from './testimonials'
import servicePage from './servicePage';
import choose from './choose'
import affiliate from './affiliate'
import buyer from './buyer'
import image from './image'
import snap from './snapScroll'
import board from './board'
import chat from './chat'
import footer from './footer'
import order from './order'
import { productReducers, productUploadReducers } from './productReducers'
import { clientLoginReducer, clientDetailsReducer, clientRegisterReducer } from './clientReducer'
import { marketerRegisterReducer, marketerLoginReducer } from './marketerReducer'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'


const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['clientLoginReducer','clientDetailsReducer']
}

const rootReducer = combineReducers({
    services,
    featured,
    testimonials,
    servicePage,
    choose,
    productReducers,
    productUploadReducers,
    affiliate,
    buyer,
    image,
    snap,
    board,
    chat,
    footer,
    order,
    clientLoginReducer,
    clientDetailsReducer,
    clientRegisterReducer,
    marketerRegisterReducer,
    marketerLoginReducer
});

export default persistReducer(persistConfig, rootReducer)