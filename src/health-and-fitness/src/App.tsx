import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
  const [responseData, setResponseData] = useState(null); // State to store response data

  const URL = import.meta.env.DEV ? import.meta.env.VITE_BE_LOCAL_TEST_URL : window.location.origin; // Define the URL based on the environment

  useEffect(() => {
    // Define the fetch function
    const fetchData = async () => {
      try {
        const params = new URLSearchParams({ 'username': 'exampleUser' }); // Create URLSearchParams object
        const response = await fetch(`${URL}/api/user?${params}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
        });
        
        // Check if the response is okay
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json(); // Parse JSON response
        setResponseData(data); // Update response data state
      } catch (error) {
        console.error(error);
      }
    };

    const createUser = async () => {
      try {
        const response = await fetch(`${URL}/api/user`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: 'exampleUser3',
            password: '12345'

          }),
        });

        // Check if the response is okay
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json(); // Parse JSON response
        setResponseData(data); // Update response data state
      } catch (error) {
        console.error(error);
      }
    }

    const updateUser = async () => {
      try {
        const response = await fetch(`${URL}/api/user`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: 'exampleUser2',
            oldPassword: '12345',
            newPassword: '54321'
          }),
        });

        // Check if the response is okay
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json(); // Parse JSON response
        setResponseData(data); // Update response data state
      } catch (error) {
        console.error(error);
      }
    }

    const deleteUser = async () => {
      try {
        const params = new URLSearchParams({ 'username': 'exampleUser3' }); // Create URLSearchParams object
        const response = await fetch(`${URL}/api/user?${params}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          },
        });

        // Check if the response is okay
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json(); // Parse JSON response
        setResponseData(data); // Update response data state
      } catch (error) {
        console.error(error);
      }
    }

    // createUser();
    // fetchData();
    // updateUser();
    deleteUser();
  }, [URL]); // Empty dependency array to run only once

  return (
    <div className="App">
      <header className="App-header">
        <img src={reactLogo} className="App-logo" alt="logo" />
        <img src={viteLogo} className="App-logo" alt="logo" />

        {/* Display fetched data or loading state */}
        <h2>API Response:</h2>
        {responseData ? <pre>{JSON.stringify(responseData, null, 2)}</pre> : <p>Loading...</p>}
      </header>
    </div>
  );
}

export default App;
