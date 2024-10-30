import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
  const [responseData, setResponseData] = useState(null); // State to store response data

  useEffect(() => {
    // Define the fetch function
    const fetchData = async () => {
      try {
        const params = new URLSearchParams({ 'username': 'exampleUser' }); // Create URLSearchParams object
        const response = await fetch(`https://intro2se-staging.vercel.app/api/user?${params}`, {
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
        const response = await fetch('https://intro2se-staging.vercel.app/api/user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: 'exampleUser2',
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

    createUser();
    fetchData(); // Call the fetch function when component mounts
  }, []); // Empty dependency array to run only once

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
