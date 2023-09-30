import { type UserTokenSchema } from '../type/userTokenSchema'
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

const initialState: UserTokenSchema = {
    token: ''
}

const userTokenSlice = createSlice({
    initialState,
    name: 'token',
    reducers: {
        setToken (state, action: PayloadAction<string>) {
            state.token = action.payload
        }
    }
})
export const { setToken } = userTokenSlice.actions
export const tokenReducer = userTokenSlice.reducer
