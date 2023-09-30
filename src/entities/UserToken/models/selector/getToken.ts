import { type UserTokenSchema } from '../type/userTokenSchema'

export const getToken = (state: UserTokenSchema) => state.token
