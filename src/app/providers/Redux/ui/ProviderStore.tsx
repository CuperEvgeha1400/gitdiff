import { Provider } from 'react-redux'
import { setUpStore } from '../models/store'

interface ProviderStoreProps {
    children: React.ReactNode
}

export const ProviderStore: React.FC<ProviderStoreProps> = ({ children }: ProviderStoreProps) => {
    const store = setUpStore()
    return (
        <Provider store={store}>
            {children}
        </Provider>
    )
}
