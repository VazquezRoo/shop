import { createSlice } from "@reduxjs/toolkit";
import { axiosEcomeerce, getConfig } from "../../utils/configAxios";
import CartProduct from "../../components/layout/card/CartProduct";


const initialState = {
    products: [],
    isShowCart: false


}

const cartSlice = createSlice({
    name:'cart',
    initialState,
    reducers: {
        changeIsShowCart: (state)=>{
            state.isShowCart = !state.isShowCart
        },
        setProducts: (state, action) =>{
            const newProduct = action.payload
            state.products = newProduct
        },
        addProductQuantity: state=>{
            const newQuantity = state.products[0].quantity + 1
            state.products[0].quantity = newQuantity
        },
       
    }
})

export const {changeIsShowCart, setProducts, addProductQuantity, lessProductQuantity} = cartSlice.actions

export const getCartProducts = () => (dispatch) =>{
        axiosEcomeerce.get('cart', getConfig())
        .then(res=> dispatch(setProducts(res.data)))
        .catch(err=> console.log(err))
}

export const addProductCart = (data) => (dispatch) =>{
        axiosEcomeerce.post('cart', data, getConfig())
        .then(()=> dispatch(getCartProducts()))
        .catch(err=> console.log(err))
}

export const deleteProductCart = (id) => (dispatch) =>{
    axiosEcomeerce.delete(`cart/${id}`, getConfig())
    .then(()=> dispatch(getCartProducts()))
    .catch(err=> console.log(err))
}

export const purchaseCart = () => (dispatch) =>{
    axiosEcomeerce.post(`purchases`,{}, getConfig())
    .then(()=> dispatch(getCartProducts()))
    .catch(err=> console.log(err))
}
export const updateCart = (data,id) => (dispatch) =>{
    axiosEcomeerce.put(`cart/${id}`,data, getConfig())
    .then(()=> dispatch(getCartProducts()))
    .catch(err=> console.log(err))
}





export default cartSlice.reducer