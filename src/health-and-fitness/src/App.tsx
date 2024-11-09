import { useState, useEffect } from 'react';
import axios from 'axios';  // Don't forget to install axios with npm install axios
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
  const [responseData, setResponseData] = useState(null);
  const URL = import.meta.env.DEV ? import.meta.env.VITE_BE_LOCAL_TEST_URL : window.location.origin;

  useEffect(() => {
    const signIn = async (email: string, password: string) => {
      try {
        const response = await axios.post(`${URL}/api/user/sign-in`, {
          email,
          password,
        });
    
        console.log("Sign-in successful:", response.data);
        // You can store the user info and token in your app state, localStorage, or cookies
        const { userId, token } = response.data;
    
        // Store the token in localStorage (or wherever you prefer)
        localStorage.setItem('token', token);
    
        // Optionally, navigate the user to the dashboard or homepage
        // window.location.href = '/dashboard';
        setResponseData(response.data);
      } catch (error) {
          console.error("Error during sign-in:", error);
      }
    };

    // Define the fetch function
    const fetchData = async () => {
      try {
        const response = await axios.get(`${URL}/api/user`, {
          withCredentials: true,
          params: { username: 'exampleUser' },
        });
        setResponseData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    const createUser = async () => {
      try {
        const response = await axios.post(`${URL}/api/user`, {
          email: 'baoduytdn@gmail.com',
          username: 'exampleUser3',
          password: '12345678'
        }, {
          withCredentials: true,
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
          username: 'exampleUser3',
          oldPassword: '12345678',
          newPassword: '87654321'
        }, {
          withCredentials: true,
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
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          }
        });
        setResponseData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    signIn('baoduytdn@gmail.com', '12345678');
    // createUser();
    // fetchData();
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