import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: null,
};

export const counterSlice = createSlice({
    name: 'userData',
    initialState,
    reducers: {
        setUserData: (state, action) => {
            state.value = action.payload;
        },
    },
})

// Action creators are generated for each case reducer function
export const { setUserData } = counterSlice.actions

export default counterSlice.reducer