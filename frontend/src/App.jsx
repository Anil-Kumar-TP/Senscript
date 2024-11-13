import React from 'react';
import { AuthProvider } from './context/authContext';
import Login from './components/Login';
import Logout from './components/Logout';
import Profile from './components/Profile';

function App () {
  return (
    <AuthProvider>
      <div>
        <h1>Welcome to the our page</h1>
        <Login />
        <Logout />
        <Profile />
      </div>
    </AuthProvider>
  );
}

export default App;
