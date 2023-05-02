import React, { useContext } from "react";
import { View, Platform } from "react-native";
import { BannerAd, BannerAdSize, TestIds } from "react-native-google-mobile-ads";
import AuthContext from "../contexts/AuthContext";

export const Banner = () => {
  const { isPremium } = useContext(AuthContext);
  console.log('isPremium');
  console.log(isPremium);

  const productionID = Platform.select({
    ios: "ca-app-pub-2677960012216792/2559650898",
    android: "ca-app-pub-2677960012216792/2858421416"
  })
  
  return (<>
    {isPremium ? (
        <View></View>
      ) : (
        <BannerAd
          unitId={TestIds.BANNER}
          size={BannerAdSize.BANNER}
          requestOptions={{ requestNonPersonalizedAdsOnly: true}}
        />
    )}
  </>)
}