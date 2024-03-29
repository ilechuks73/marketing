import { 
    MARKETER_LOGIN_FAILURE,
    MARKETER_LOGIN_REQUEST,
    MARKETER_LOGIN_SUCCESS,
    MARKETER_LOGOUT,
    MARKETER_REGISTER_FAILURE, 
    MARKETER_REGISTER_REQUEST, 
    MARKETER_REGISTER_SUCCESS 
} from "../constants/marketerConstant"


export const marketerRegisterReducer =  (state = {}, action) => {
    switch(action.type){
        case MARKETER_REGISTER_REQUEST:
            return {
                loading: true
            }
        case MARKETER_REGISTER_SUCCESS:
            return {
                loading: false,
                marketerInfo: action.payload
            }
        case MARKETER_REGISTER_FAILURE:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}

export const marketerLoginReducer =  (state = {}, action) => {
    switch(action.type){
        case MARKETER_LOGIN_REQUEST:
            return {
                loading: true
            }
        case MARKETER_LOGIN_SUCCESS:
            return {
                loading: false,
                marketerInfo: action.payload
            }
        case MARKETER_LOGIN_FAILURE:
            return {
                loading: false,
                error: action.payload
            }
        case MARKETER_LOGOUT:
            return {}
        default:
            return state
    }
}