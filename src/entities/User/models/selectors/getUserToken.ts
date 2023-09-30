import { type UserSchema } from '../types/userSchema'

export const getUserToken = (state: UserSchema) => state.token
