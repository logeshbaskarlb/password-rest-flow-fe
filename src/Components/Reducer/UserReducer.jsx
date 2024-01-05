import { createSlice, } from '@reduxjs/toolkit';

const UserSlice = createSlice({
    name: 'users',
    initialState: {
        loading:false,
        showPassword:false
    },
    reducers: {
        setLoading:(state,action)=>{
            state.loading = action.payload
        },
        setShowPassword:(state,action)=>{
            state.showPassword = action.payload;
          }
    },
    
});
export const {setLoading,setShowPassword} =  UserSlice.actions
export default UserSlice.reducer;