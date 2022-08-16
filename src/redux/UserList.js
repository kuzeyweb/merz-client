import {createSlice} from '@reduxjs/toolkit';

export const UserList = createSlice({
    name: "userList",
    initialState:{
        userList: null,
        isFetched : false,
        error: false,
    },
    reducers: {
        setUserListSuccess: (state,action) => {
            state.userList = action.payload;
            state.error = false;
            state.isFetched = true;
        },
        setUserListFailure: (state) => {
            state.error = true;
        },
    }
}) 

export const { setUserListFailure, setUserListSuccess } = UserList.actions;
export default UserList.reducer;