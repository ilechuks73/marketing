import { 
    PRODUCT_LIST_REQUEST, 
    PRODUCT_LIST_SUCCESS, 
    PRODUCT_LIST_FAILURE, 
    PRODUCT_UPLOAD_REQUEST, 
    PRODUCT_UPLOAD_SUCCESS, 
    PRODUCT_UPLOAD_FAILURE 
} from '../constants/products'
import axios from 'axios'

export const productList = () => async (dispatch) => {
    try {

        dispatch({ type: PRODUCT_LIST_REQUEST })

        const { data  } = await axios.get(`${process.env.REACT_APP_API_URL}/products`)

        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: data
        })
    } catch (error) {

        dispatch({
            type: PRODUCT_LIST_FAILURE,
            payload: error.response && error.response.data.msg ? error.response.data.msg : error.msg
        })
    }
}

export const productUpload = (name, amount, commission, rating, productImg, description) => async (dispatch, getState) => {
    try {


        const {
            clientLoginReducer: { clientInfo }
        } = getState()

        const { 
            clientDetailsReducer: { user }
    } = getState()
        const config = ({
            headers: {
                'Content-Type': "application/json",
                "x-auth-token": `${clientInfo.token}` 
            }
        })

            dispatch({ type: PRODUCT_UPLOAD_REQUEST })

        const { data  } = await axios.post(`${process.env.REACT_APP_API_URL}/products/client/${user._id}/addproduct`, 
        {name, amount, commission, rating, productImg, description}, config)

        dispatch({
            type: PRODUCT_UPLOAD_SUCCESS,
            payload: data
        })  
    } catch (error) {

        dispatch({
            type: PRODUCT_UPLOAD_FAILURE,
            payload: error.response && error.response.data.msg ? error.response.data.msg : error.msg
        })
    }
}