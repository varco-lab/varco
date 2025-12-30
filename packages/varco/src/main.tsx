import { createRoot } from 'react-dom/client'
import { ErrorBoundary } from './error-boundary.js'
import App from 'virtual:react-app'

const root = createRoot(document.getElementById('root')!)
root.render(
    <ErrorBoundary>
        <App />
    </ErrorBoundary>
)
