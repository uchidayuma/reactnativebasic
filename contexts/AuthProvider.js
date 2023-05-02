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
    const isMontlyActive = _.get(customerInfo, 'entitlements.active.monthly.isActive', false);
    const isAnnualActive = _.get(customerInfo, 'entitlements.active.annual.isActive', false);
    console.log('rcinit : isMontlyActive = ', isMontlyActive);
    console.log('rcinit : isAnnualActive = ', isAnnualActive);
    if ( isMontlyActive || isAnnualActive ) {
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
      } else {
        setUser(null);
        setIsPremium(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <AuthContext.Provider value={{ user, setUser, isPremium, setIsPremium, restoreUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;