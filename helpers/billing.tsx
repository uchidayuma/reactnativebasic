import { useContext } from 'react';
import Purchases from 'react-native-purchases';
import Constants from 'expo-constants';
import { dummyPlans } from '../constants/plans';
import _ from 'lodash';
import AuthContext from '../contexts/AuthContext';

export const getSubscriptionPlans = async () => {
  if( Constants.appOwnership === 'expo' ) {
    return dummyPlans;
  }
  try {
    const offerings = await Purchases.getOfferings();
    if (offerings.current !== null && offerings.current.availablePackages.length !== 0) {
      return offerings.current.availablePackages
    }
  } catch (e) {
    console.log(e);
    alert('Error fetching subscription plans. Please try again later.')
  }
}

export const purchaseSubscription = async(plan:{} = {}) => {
  const { restoreUser } = useContext(AuthContext);
  console.log('purchaseSubscription');
  console.log(plan);
  
  try {
    const purchaseInfo = await Purchases.purchasePackage(plan);
    console.log(purchaseInfo);

    if ( _.get(purchaseInfo, 'entitlements.active.my_entitlement_identifier', true) ) {
      // 購入後の処理を実行します（例：コンテンツのロック解除）
      alert('決済OK');
      restoreUser();
    }
  } catch (error) {
    if (error.code === "E_USER_CANCELLED") {
      console.log("User cancelled the purchase");
    } else {
      console.error("Error during purchase: ", error);
    }
  }
}