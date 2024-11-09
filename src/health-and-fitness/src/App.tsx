import { useState, useEffect } from 'react';
import axios from 'axios';  // Don't forget to install axios with npm install axios
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
  const [responseData, setResponseData] = useState(null);
  const URL = import.meta.env.DEV ? import.meta.env.VITE_BE_LOCAL_TEST_URL : window.location.origin;

  useEffect(() => {
    // Define the fetch function
    const fetchData = async () => {
      try {
        const response = await axios.get(`${URL}/api/user`, {
          params: { username: 'exampleUser' },
          headers: {
            'Content-Type': 'application/json'
          }
        });
        setResponseData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    const createUser = async () => {
      try {
        const response = await axios.post(`${URL}/api/user`, {
          username: 'exampleUser3',
          password: '12345'
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        setResponseData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    const updateUser = async () => {
      try {
        const response = await axios.put(`${URL}/api/user`, {
          username: 'exampleUser2',
          oldPassword: '12345',
          newPassword: '54321'
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        setResponseData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    const deleteUser = async () => {
      try {
        const response = await axios.delete(`${URL}/api/user`, {
          params: { username: 'exampleUser3' },
          headers: {
            'Content-Type': 'application/json'
          }
        });
        setResponseData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    // createUser();
    fetchData();
    // updateUser();
    // deleteUser();
  }, [URL]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={reactLogo} className="App-logo" alt="logo" />
        <img src={viteLogo} className="App-logo" alt="logo" />
        <h2>API Response:</h2>
        {responseData ? <pre>{JSON.stringify(responseData, null, 2)}</pre> : <p>Loading...</p>}
      </header>
    </div>
  );
}

export default App;