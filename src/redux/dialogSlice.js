import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    title: '',
    status: false
}

export const dialogSlice = createSlice({
    name: 'dialog',
    initialState,
    reducers: {
        setDialog: (state, action) => {
            const { title, status } = action.payload
            state.title = title
            state.status = status
        }
    }
})

export const { setDialog } = dialogSlice.actions 
export default dialogSlice.reducer