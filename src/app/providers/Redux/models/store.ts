import { configureStore } from '@reduxjs/toolkit'
import { type reduxSchema } from './typesStore'

const ReducersStore: reduxSchema = {
}

export const setUpStore = (): ReturnType<typeof configureStore> => {
    return configureStore({
        reducer: ReducersStore
    })
}
