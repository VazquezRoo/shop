import { configureStore } from "@reduxjs/toolkit";
import userInfo from "./slices/userInfo.slice";
import cart from "./slices/cart.slice";
import createUser from "./slices/createUser";

export default configureStore({
    reducer:{
        userInfo,
        cart,
        createUser
    }
})