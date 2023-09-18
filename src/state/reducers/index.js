import { combineReducers } from "redux";
import cartReducer from "./cartSlice";

const reducers = combineReducers({
    cart: cartReducer
});

export default reducers;