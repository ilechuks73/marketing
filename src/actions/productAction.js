import { PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAILURE } from '../constants/products'
import axios from 'axios'

export const productList = () => async (dispatch) => {
    try {

        dispatch({ type: PRODUCT_LIST_REQUEST })

        const { data  } = await axios.get('/products')
        console.log(data)

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