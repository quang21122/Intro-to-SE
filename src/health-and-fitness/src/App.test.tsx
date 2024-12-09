import App from './App'
import { AuthProvider } from './contexts/AuthProvider'
import { render, screen } from '@testing-library/react'

describe('App', () => {
    it('should render', () => {
        render(
            <AuthProvider>
                <App />
            </AuthProvider>
        )
        expect(screen.getByText('Conquer your doubts stay fearless')).toBeInTheDocument()
    })
})