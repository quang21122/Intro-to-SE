import App from './App'
import { AuthProvider } from './contexts/AuthProvider'
import { ProfileProvider } from './contexts/ProfileProvider'
import { render, screen } from '@testing-library/react'

describe('App', () => {
    it('should render', () => {
        render(
            <AuthProvider>
                <ProfileProvider>
                    <App />
                </ProfileProvider>
            </AuthProvider>
        )
        expect(screen.getByText(/stay fearless/i)).toBeInTheDocument()
    })
})