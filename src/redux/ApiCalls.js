import { publicRequest } from "../requestMethods";
import { setUserListFailure, setUserListSuccess } from "./UserList";
import { loginFailure, loginSuccess } from "./UserSlice";

export const Login = async (dispatch, user) => {
    try {
        const res = await publicRequest.post("users/signin", user);
        dispatch(loginSuccess(res.data.user[0]));
    } catch (err) {
        dispatch(loginFailure());
    }
} 
export const getUserList = async (dispatch) => {
    try {
        const res = await publicRequest.get("users/getall");
        dispatch(setUserListSuccess(res.data.sort((a,b) => a.id - b.id)));
    } catch (err) {
        dispatch(setUserListFailure());
    }
} 
