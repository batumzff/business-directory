import React from "react";
import * as WebBrowser from "expo-web-browser";


export const useWarmUpBrowser = () => {
  React.useEffect(() => {
    // Warm up the browser to improve the user experience
    WebBrowser.warmUpAsync().catch(console.error);
    return () => {
      WebBrowser.coolDownAsync().catch(console.error);
    };
  }, []);
};