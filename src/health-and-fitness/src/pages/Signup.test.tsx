import Signup from './Signup'
import { AuthProvider } from '../contexts/AuthProvider'
import { ProfileProvider } from '../contexts/ProfileProvider'
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom';
import { auth } from '../firebaseAdmin.js';

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

    // let isAlreadySignedUp = false;
    // it('should allow user to sign up with valid data', async () => {

    //     const testEmail = 'john@gmail.com';

    //     if (isAlreadySignedUp) {
    //         console.log(`Email ${testEmail} đã được sử dụng trong lần test trước.`);
    //         return; // Không chạy lại sign-up nếu email đã được sử dụng
    //     }

    //     render(
    //         <MemoryRouter>
    //             <AuthProvider>
    //                 <ProfileProvider>
    //                     <Signup />
    //                 </ProfileProvider>
    //             </AuthProvider>
    //         </MemoryRouter>
    //     );

    //     await act(async () => {
    //         fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'John Doe' } });
    //         fireEvent.change(screen.getByLabelText(/email/i), { target: { value: testEmail } });
    //         fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password123' } });
    //         fireEvent.change(screen.getByLabelText(/confirm password/i), { target: { value: 'password123' } });
    //         fireEvent.click(screen.getByRole('button', { name: 'Sign Up' }));
    //     });

    //     waitFor(() => {
    //         expect(localStorage.getItem('isAuthenticated')).toBe('true');
    //     })
    //     isAlreadySignedUp = true;
    // });


    it('should show error message for invalid email format', async () => {
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
            fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'invalid-email' } });
            fireEvent.click(screen.getByRole('button', { name: /sign up/i }));
        });
        await waitFor(() => {
            expect(screen.getByText(/Invalid email/i)).toBeInTheDocument();
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
            fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password123' } });
            fireEvent.change(screen.getByLabelText(/confirm password/i), { target: { value: 'password1234' } });
            fireEvent.click(screen.getByRole('button', { name: /sign up/i }));
        })
       
        await waitFor(() => {
            expect(screen.getByText(/Passwords do not match/i)).toBeInTheDocument();
        });
    });
});