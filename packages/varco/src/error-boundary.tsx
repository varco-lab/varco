import React from 'react'

interface ErrorBoundaryProps {
    children: React.ReactNode
    fallback?: React.ReactNode
}

interface ErrorBoundaryState {
    hasError: boolean
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    state: ErrorBoundaryState = {
        hasError: false,
    }

    static getDerivedStateFromError(_: Error): ErrorBoundaryState {
        return { hasError: true }
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error('Error', error, errorInfo)
    }

    render() {
        const { hasError } = this.state
        const { fallback, children } = this.props

        if (hasError) {
            return fallback ?? (
                <p>
                    <strong>Something went wrong.</strong><br />
                    Please check the browser console for more details.
                </p>
            )
        }

        return children
    }
}
