import React, { useState, useEffect } from 'react';
import { Platform } from 'react-native';
import AuthContext from './AuthContext';
import Purchases from 'react-native-purchases';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    restoreUser();
  }, []);

  const rcinit = async (user) => {
    if (Platform.OS === 'ios') {
      await Purchases.configure({ apiKey: 'appl_eCkJqfBdAKLdwrlUfRvlUSCBNeq', appUserID: user.uid });
    } else if (Platform.OS === 'android') {
      await Purchases.configure({ apiKey: 'goog_QfyvSnfrGobMgexckUksOUkmRZG', appUserID: user.uid  });
    }
  }
  
  const restoreUser = async () => {
    try {
      const userData = await AsyncStorage.getItem('user');
      console.log('restoreUser : userData = ', userData);
      if (userData) {
        setUser(JSON.parse(userData));
        rcinit(JSON.parse(userData));
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