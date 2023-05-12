import { createSlice } from "@reduxjs/toolkit";
import { axiosEcomeerce } from "../../utils/configAxios";
import Swal from "sweetalert2";


const initialState = {
    token: '',
    user: null,
    modal: false
}


const userInfoSlice =  createSlice ({
    name: 'userInfo',
    initialState: JSON.parse(localStorage.getItem('userInfo')) ?? initialState,
    reducers: {
        setUserInfo: (state, action) => {
            const newState = {...state, ...action.payload}
            localStorage.setItem("userInfo", JSON.stringify(newState))
            return newState
        },
        logOut: (state) =>{
            const newState = {...state, ...initialState}
            localStorage.setItem("userInfo", JSON.stringify(newState))
            return newState
        },
        changeModal:(state) =>{
            state.modal = !state.modal
        }


    }
})

export const {setUserInfo, logOut, changeModal} = userInfoSlice.actions

export const loginUser =  (data) => (dispatch) => {

    axiosEcomeerce.post('users/login', data)
        .then((res)=> dispatch(setUserInfo(res.data)))
        .catch((err)=>{
            Swal.fire(err.response.data.error)
            console.log(err)})
}

export default userInfoSlice.reducer;