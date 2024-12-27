import Signup from './Signup'
import { AuthProvider } from '../contexts/AuthProvider'
import { ProfileProvider } from '../contexts/ProfileProvider'
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom';

describe('Signup Page', () => {
    it('should render signup form', () => {
        render(
            <MemoryRouter>
                <AuthProvider>
                    <ProfileProvider>
                        <Signup />
                    </ProfileProvider>
                </AuthProvider>
            </MemoryRouter>
        );

        // Kiểm tra các input field
        expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
        expect(screen.getByLabelText('Password')).toBeInTheDocument();
        expect(screen.getByLabelText('Confirm Password')).toBeInTheDocument();

        // Kiểm tra nút "Sign Up"
        expect(screen.getByRole('button', { name: /sign up/i })).toBeInTheDocument();
    });

    it('should show error message for missing information', async () => {
        render(
            <MemoryRouter>
                <AuthProvider>
                    <ProfileProvider>
                        <Signup />
                    </ProfileProvider>
                </AuthProvider>
            </MemoryRouter>
        );

        await act(async () => {
            fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'email@gmail.com' } });
            fireEvent.click(screen.getByRole('button', { name: /sign up/i }));
        });
        await waitFor(() => {
            expect(screen.getByText(/fill in/i)).toBeInTheDocument();
        });

    });



    it('should show error message when passwords do not match', async () => {
        render(
            <MemoryRouter>
                <AuthProvider>
                    <ProfileProvider>
                        <Signup />
                    </ProfileProvider>
                </AuthProvider>
            </MemoryRouter>
        );
        await act(async () => {
            fireEvent.change(screen.getByLabelText(/Username/i), { target: { value: 'hallo' } });
            fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'email@gmail.com' } });
            fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password123' } });
            fireEvent.change(screen.getByLabelText(/confirm password/i), { target: { value: 'password1234' } });
            fireEvent.click(screen.getByRole('button', { name: /sign up/i }));
        })
       
        await waitFor(() => {
            expect(screen.getByText(/Passwords do not match/i)).toBeInTheDocument();
        });
    });
});