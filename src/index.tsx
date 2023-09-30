import { createRoot } from 'react-dom/client'
import { App } from 'app/App'
import { ProviderStore } from 'app/providers/Redux'
import { Suspense } from 'react'
import { WindowLoader } from 'widgets/WindowLoader'

const root = createRoot(document.getElementById('root'))
root.render(
    <Suspense fallback={<WindowLoader/>}>
        <ProviderStore>
            <App/>
        </ProviderStore>
    </Suspense>
)
