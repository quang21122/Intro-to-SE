import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import Exercises from './Exercises';  // Replace with your actual component
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthProvider';
import { ProfileProvider } from '../contexts/ProfileProvider';

describe('ExerciseLibrary Page - Filter Functionality', () => {
    // Cancel filter exercise
    it('should cancel filter exercise and show all exercises', async () => {
        render(
            <MemoryRouter>
                <AuthProvider>
                    <ProfileProvider>
                        <Exercises />
                    </ProfileProvider>
                </AuthProvider>
            </MemoryRouter>
        );

        // Wait for loading to finish
        await waitFor(() => {
            if (!screen.queryByText(/loading.../i)) {
                expect(screen.queryByText(/loading.../i)).not.toBeInTheDocument();
            }
        });

        // Apply a filter first (e.g., by muscle group)
        const muscleFilterButton = screen.getByText(/show muscle filter/i);
        await act(async () => {
            fireEvent.click(muscleFilterButton);
        });
        await waitFor(() => {
            expect(screen.getByText(/cardio/i)).toBeInTheDocument();
        })

        const cardioOptionText = screen.getByText(/cardio/i);
        const cardioOption = cardioOptionText.closest('div')?.querySelector('.cursor-pointer');
        if (cardioOption) {
            await act(async () => {
                fireEvent.click(cardioOption);
            });
        }

        // Wait for filtered exercises to appear
        await waitFor(() => {
            const filteredExercises = screen.getAllByText(/cardio/i);
            expect(filteredExercises.length).toBeGreaterThan(1);
        }, { timeout: 5000 });

        // Now, cancel the filter
        await act(async () => {
            fireEvent.click(cardioOption!);
        });

        // Wait for the exercises to return to their unfiltered state
        await waitFor(() => {
            expect(screen.getByText('Air Bike')).toBeInTheDocument();
            expect(screen.getByText('Barbell Bench Press')).toBeInTheDocument();
        }, { timeout: 3000 });
    });

    // Filter exercises by one muscle group
    it('should filter exercises by one muscle group', async () => {
        render(
            <MemoryRouter>
                <AuthProvider>
                    <ProfileProvider>
                        <Exercises />
                    </ProfileProvider>
                </AuthProvider>
            </MemoryRouter>
        );

        // Wait for loading to finish
        await waitFor(() => {
            if (!screen.queryByText(/loading.../i)) {
                expect(screen.queryByText(/loading.../i)).not.toBeInTheDocument();
            }
        });

        // Apply a filter first (e.g., by muscle group)
        const muscleFilterButton = screen.getByText(/show muscle filter/i);
        await act(async () => {
            fireEvent.click(muscleFilterButton);
        });
        await waitFor(() => {
            expect(screen.getByText(/cardio/i)).toBeInTheDocument();
        })

        const cardioOptionText = screen.getByText(/cardio/i);
        const cardioOption = cardioOptionText.closest('div')?.querySelector('.cursor-pointer');
        if (cardioOption) {
            await act(async () => {
                fireEvent.click(cardioOption);
            });
        }

        // Wait for filtered exercises to appear
        await waitFor(() => {
            const filteredExercises = screen.getAllByText(/cardio/i);
            expect(filteredExercises.length).toBeGreaterThan(1);
        }, { timeout: 5000 });
    });

    // Filter exercises by multiple muscle groups
    it('should show exercises have one of the muscle groups', async () => {
        render(
            <MemoryRouter>
                <AuthProvider>
                    <ProfileProvider>
                        <Exercises />
                    </ProfileProvider>
                </AuthProvider>
            </MemoryRouter>
        );

        // Wait for loading to finish
        await waitFor(() => {
            if (!screen.queryByText(/loading.../i)) {
                expect(screen.queryByText(/loading.../i)).not.toBeInTheDocument();
            }
        });

        // Apply a filter first (e.g., by muscle group)
        const muscleFilterButton = screen.getByText(/show muscle filter/i);
        await act(async () => {
            fireEvent.click(muscleFilterButton);
        });
        await waitFor(() => {
            expect(screen.getByText(/cardio/i)).toBeInTheDocument();
        })

        const cardioOptionText = screen.getByText(/cardio/i);
        const cardioOption = cardioOptionText.closest('div')?.querySelector('.cursor-pointer');
        if (cardioOption) {
            await act(async () => {
                fireEvent.click(cardioOption);
            });
        }

        const forearmsOptionText = screen.getByText(/forearms/i);
        const forearmsOption = forearmsOptionText.closest('div')?.querySelector('.cursor-pointer');
        if (forearmsOption) {
            await act(async () => {
                fireEvent.click(forearmsOption);
            });
        }

        // Wait for filtered exercises to appear
        await waitFor(() => {
            const filteredExercises = screen.getAllByText(/cardio/i);
            expect(filteredExercises.length).toBeGreaterThan(1);

            const filteredExercises2 = screen.getAllByText(/forearms/i);
            expect(filteredExercises2.length).toBeGreaterThan(1);
        }, { timeout: 5000 });
    });

    // Filter exercises by both muscle group and equipment
    it('should show exercises have both the the muscle groups and the equipment', async () => {
        render(
            <MemoryRouter>
                <AuthProvider>
                    <ProfileProvider>
                        <Exercises />
                    </ProfileProvider>
                </AuthProvider>
            </MemoryRouter>
        );

        // Wait for loading to finish
        await waitFor(() => {
            if (!screen.queryByText(/loading.../i)) {
                expect(screen.queryByText(/loading.../i)).not.toBeInTheDocument();
            }
        });

        // Apply a filter first (e.g., by muscle group)
        const muscleFilterButton = screen.getByText(/show muscle filter/i);
        await act(async () => {
            fireEvent.click(muscleFilterButton);
        });
        const equipmentFilterButton = screen.getByText(/show equipment filter/i);
        await act(async () => {
            fireEvent.click(equipmentFilterButton);
        });
        await waitFor(() => {
            expect(screen.getByText(/back/i)).toBeInTheDocument();
        })
        await waitFor(() => {
            expect(screen.getByText(/barbell/i)).toBeInTheDocument();
        })

        const backOptionText = screen.getByText(/back/i);
        const backOption = backOptionText.closest('div')?.querySelector('.cursor-pointer');
        if (backOption) {
            await act(async () => {
                fireEvent.click(backOption);
            });
        }
        const barbellOptionText = screen.getByText(/barbell/i);
        const barbellOption = barbellOptionText.closest('div')?.querySelector('.cursor-pointer');
        if (barbellOption) {
            await act(async () => {
                fireEvent.click(barbellOption);
            });
        }

        // Wait for filtered exercises to appear
        await waitFor(() => {
            const filteredExercises = screen.getAllByText(/back/i);
            expect(filteredExercises.length).toBeGreaterThan(1);
            const filteredExercises2 = screen.getAllByText(/barbell/i);
            expect(filteredExercises2.length).toBeGreaterThan(1);
        }, { timeout: 5000 });
    });

    // Handle no matching results with filter
    it('should show no matching results', async () => {
        render(
            <MemoryRouter>
                <AuthProvider>
                    <ProfileProvider>
                        <Exercises />
                    </ProfileProvider>
                </AuthProvider>
            </MemoryRouter>
        );

        // Wait for loading to finish
        await waitFor(() => {
            if (!screen.queryByText(/loading.../i)) {
                expect(screen.queryByText(/loading.../i)).not.toBeInTheDocument();
            }
        });

        // Apply a filter first (e.g., by muscle group)
        const equipmentFilterButton = screen.getByText(/show equipment filter/i);
        await act(async () => {
            fireEvent.click(equipmentFilterButton);
        });
        await waitFor(() => {
            expect(screen.getByText(/Exercise Ball/i)).toBeInTheDocument();
        })

        const exerciseBallOptionText = screen.getByText(/Exercise Ball/i);
        const exerciseBallOption = exerciseBallOptionText.closest('div')?.querySelector('.cursor-pointer');
        if (exerciseBallOption) {
            await act(async () => {
                fireEvent.click(exerciseBallOption);
            });
        }

        // Wait for filtered exercises to appear
        await waitFor(() => {
            expect(screen.getByText(/no available exercises found/i)).toBeInTheDocument();
        }, { timeout: 5000 });
    });
});
