export interface UserSchema {
    id: string
    username: string
    token: string
}
export interface AuthSchema {
    authData?: UserSchema
}
