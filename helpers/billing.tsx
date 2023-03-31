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