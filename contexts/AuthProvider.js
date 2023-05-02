import React, { useState, useEffect } from 'react';
import { Platform } from 'react-native';
import AuthContext from './AuthContext';
import Purchases from 'react-native-purchases';
import AsyncStorage from '@react-native-async-storage/async-storage';
import _ from 'lodash';

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isPremium, setIsPremium] = useState(false);

  useEffect(() => {
    restoreUser();
  }, []);

  const rcinit = async (user) => {
    if (Platform.OS === 'ios') {
      await Purchases.configure({ apiKey: 'appl_eCkJqfBdAKLdwrlUfRvlUSCBNeq', appUserID: user.uid });
    } else if (Platform.OS === 'android') {
      await Purchases.configure({ apiKey: 'goog_QfyvSnfrGobMgexckUksOUkmRZG', appUserID: user.uid  });
    }
    const customerInfo = await Purchases.getCustomerInfo();
    console.log('rcinit : customerInfo = ', customerInfo);
    
    // if( 月額課金ユーザー or 年額課金ユーザー ) {
    if ( _.get(customerInfo, 'entitlements.active.monthly.isActive', false) || _.get(customerInfo, 'entitlements.active.annual.isActive', false) ) {
      setIsPremium(true);
    } else {
      setIsPremium(false);
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
    <AuthContext.Provider value={{ user, setUser, isPremium, setIsPremium }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;