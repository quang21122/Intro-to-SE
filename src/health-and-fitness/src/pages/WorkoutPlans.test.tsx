import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import WorkoutPlans from './WorkoutPlans';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthProvider';
import { ProfileProvider } from '../contexts/ProfileProvider';

describe('WorkoutPlans Page - Search Functionality', () => {
  // Search plans with full name
  it('should display matching plans when a full name is searched', async () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <ProfileProvider>
            <WorkoutPlans />
          </ProfileProvider>
        </AuthProvider>
      </MemoryRouter>
    );

    // Wait for the loading state to disappear
    await waitFor(() => {
      if (!screen.queryByText(/loading.../i)) {
        expect(screen.queryByText(/loading.../i)).not.toBeInTheDocument();
      }
    });

    // Now that loading is done, check for the search input
    const searchBar = screen.getByPlaceholderText(/search workout plans/i);
    expect(searchBar).toBeInTheDocument();

    // Simulate user typing into the search bar
    await act(async () => {
      fireEvent.change(searchBar, { target: { value: '6 Day Bulking Split' } });
    });

    // Wait for the search result to appear
    await waitFor(() => {
      const elements = screen.getAllByText(/6 Day Bulking Split/i);
      expect(elements.length).toBeGreaterThan(0);
    });
  });

  // Search plans with part of a name
  it('should display matching plans when a part of name is searched', async () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <ProfileProvider>
            <WorkoutPlans />
          </ProfileProvider>
        </AuthProvider>
      </MemoryRouter>
    );

    // Wait for the loading state to disappear
    await waitFor(() => {
      if (!screen.queryByText(/loading.../i)) {
        expect(screen.queryByText(/loading.../i)).not.toBeInTheDocument();
      }
    });

    // Now that loading is done, check for the search input
    const searchBar = screen.getByPlaceholderText(/search workout plans/i);
    expect(searchBar).toBeInTheDocument();

    // Simulate user typing into the search bar
    await act(async () => {
      fireEvent.change(searchBar, { target: { value: '6 Day' } });
    });

    // Wait for the search result to appear
    await waitFor(() => {
      const elements = screen.getAllByText(/6 Day Bulking Split/i);
      expect(elements.length).toBeGreaterThan(0);
    });
  });

  //Search plans with no name
  it('should display all plans when search plans with no name', async () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <ProfileProvider>
            <WorkoutPlans />
          </ProfileProvider>
        </AuthProvider>
      </MemoryRouter>
    );

    // Wait for the loading state to disappear
    await waitFor(() => {
      if (!screen.queryByText(/loading.../i)) {
        expect(screen.queryByText(/loading.../i)).not.toBeInTheDocument();
      }
    });

    // Now that loading is done, check for the search input
    const searchBar = screen.getByPlaceholderText(/search workout plans/i);
    expect(searchBar).toBeInTheDocument();

    // Simulate user typing into the search bar
    await act(async () => {
      fireEvent.change(searchBar, { target: { value: '' } });
    });

    // Wait for the search result to appear
    await waitFor(() => {
      const elements1 = screen.getAllByText(/6 Day Bulking Split/i);
      expect(elements1.length).toBeGreaterThan(1);
      const elements2 = screen.getAllByText(/Bigger Arms/i);
      expect(elements2.length).toBeGreaterThan(1);
    });
  });

  // Handle no matching results with search
  it('should display matching plans when a full name is searched', async () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <ProfileProvider>
            <WorkoutPlans />
          </ProfileProvider>
        </AuthProvider>
      </MemoryRouter>
    );

    // Wait for the loading state to disappear
    await waitFor(() => {
      if (!screen.queryByText(/loading.../i)) {
        expect(screen.queryByText(/loading.../i)).not.toBeInTheDocument();
      }
    });

    // Now that loading is done, check for the search input
    const searchBar = screen.getByPlaceholderText(/search workout plans/i);
    expect(searchBar).toBeInTheDocument();

    // Simulate user typing into the search bar
    await act(async () => {
      fireEvent.change(searchBar, { target: { value: 'afxcn@' } });
    });

    // Wait for the search result to appear
    await waitFor(() => {
      expect(screen.getByText(/No workout plans found/i)).toBeInTheDocument();
    });
  });
});
