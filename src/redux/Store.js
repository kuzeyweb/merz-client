import {configureStore} from '@reduxjs/toolkit'
import userSlice  from './UserSlice'
import userList  from './UserList'


export const store = configureStore({
    reducer: {
        user: userSlice,
        userList: userList
    },
});



