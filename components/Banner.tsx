import React from "react";
import { Platform } from "react-native";
import { BannerAd, BannerAdSize, TestIds } from "react-native-google-mobile-ads";

export const Banner = () => {

  const productionID = Platform.select({
    ios: "ca-app-pub-2677960012216792/2559650898",
    android: "ca-app-pub-2677960012216792/2858421416"
  })
  
  return (
    <BannerAd
      unitId={TestIds.BANNER}
      size={BannerAdSize.BANNER}
      requestOptions={{ requestNonPersonalizedAdsOnly: true}}
    />
  )
}