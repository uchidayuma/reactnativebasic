import Purchases from 'react-native-purchases';

export const getSubscriptionPlans = async () => {
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
  console.log('purchaseSubscription');
  console.log(plan);
  
  try {
    const purchaseInfo = await Purchases.purchasePackage(plan);
    console.log(purchaseInfo);
  
    const purchaserInfo = purchaseInfo.purchaserInfo;
    console.log(purchaserInfo);
    if (typeof purchaserInfo.entitlements.active.my_entitlement_identifier !== "undefined") {
      // 購入後の処理を実行します（例：コンテンツのロック解除）
      alert('決済OK')
    }
  } catch (error) {
    if (error.code === "E_USER_CANCELLED") {
      console.log("User cancelled the purchase");
    } else {
      console.error("Error during purchase: ", error);
    }
  }
}