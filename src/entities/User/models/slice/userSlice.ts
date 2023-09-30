import { type AuthSchema } from '../types/userSchema'
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

const initialState: AuthSchema = {
}

const userSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        authUser (state, action: PayloadAction<AuthSchema>): void {
            state.authData = action.payload.authData
        }
    }
})
export const { authUser } = userSlice.actions
export const userReducer = userSlice.reducer
