import React from 'react';
import * as WebBrowser from 'expo-web-browser';
import { Text, View, Button } from 'react-native';
import { Link } from 'expo-router';
import { useOAuth } from '@clerk/clerk-expo';
import * as Linking from 'expo-linking';

// Warm-up browser utility
const useWarmUpBrowser = () => {
  React.useEffect(() => {
    // Warm up the browser to improve the user experience
    WebBrowser.warmUpAsync().catch(console.error);
    return () => {
      WebBrowser.coolDownAsync().catch(console.error);
    };
  }, []);
};

// Ensure WebBrowser auth session completes if it's ongoing
WebBrowser.maybeCompleteAuthSession();

export default function Page() {
  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' });

  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, setActive } = await startOAuthFlow({
        redirectUrl: Linking.createURL('/dashboard'),
      });

      if (createdSessionId) {
        // Set the active session if a new session is created
        await setActive?.({ session: createdSessionId });
      } else {
        console.warn('No session was created.');
      }
    } catch (err) {
      console.error('OAuth flow error:', err);
    }
  }, [startOAuthFlow]);

  return (
    <View style={{ padding: 16 }}>
      <Link href="/">
        <Text style={{ fontSize: 18, color: 'blue', marginBottom: 16 }}>Home</Text>
      </Link>
      <Button title="Sign in with Google" onPress={onPress} />
    </View>
  );
}
