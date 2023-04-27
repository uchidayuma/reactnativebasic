import React, { useState, useEffect } from 'react';
import AuthContext from './AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    restoreUser();
  }, []);

  const restoreUser = async () => {
    try {
      const userData = await AsyncStorage.getItem('user');
      console.log('restoreUser : userData = ', userData);
      if (userData) {
        setUser(JSON.parse(userData));
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;