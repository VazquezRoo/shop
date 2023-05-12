import { createSlice } from "@reduxjs/toolkit";
import { axiosEcomeerce, getConfig } from "../../utils/configAxios";
import { loginUser } from "./userInfo.slice";


const initialState = {
    
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    edit: true,
}

const createUserSlice = createSlice({
    name: 'createUser',
    initialState,
    reducers:{
        createUser: (state, action)=>{
            const newJSon = JSON.parse(action.payload)
           const newState = {...state, ...newJSon}
           return newState

        },
        editUser: state=>{
            state.edit = false
        },
        noEditUser: state=>{
            state.edit = true
        }

    }
})




export const {createUser,editUser,noEditUser} = createUserSlice.actions



export const setNewUser = (data,navigate) => (dispatch) =>{

    axiosEcomeerce.post('users', data, getConfig())
    .then((res)=>{
        navigate('/login')
        console.log(res.data)
        dispatch(loginUser({email: data.email, password: data.password}))
    
    })
    .catch(err=>console.log(err))


}

export const deleteUser = (id) => (dispatch) =>{

    axiosEcomeerce.delete(`users/${id}`, getConfig())
    .then((res)=>console.log(res))
    .catch(err=>console.log(err))


}

export const updateUser = (id, navigate) => (dispatch) =>{

    axiosEcomeerce.put(`users/${id}`, getConfig())
    .then((res)=>{
        navigate('/login')
        console.log(res)})
    .catch(err=>console.log(err))


}

export default createUserSlice.reducer;