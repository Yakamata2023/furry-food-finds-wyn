import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { View, Text, Button, ActivityIndicator } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import firebaseConfig from './firebaseConfig';

WebBrowser.maybeCompleteAuthSession();

// Initialise Firebase once
initializeApp(firebaseConfig);

const Drawer = createDrawerNavigator();

function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Welcome to WYN Remnants</Text>
    </View>
  );
}

function Loading() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <ActivityIndicator size="large" />
    </View>
  );
}

export default function App() {
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID,
    iosClientId: process.env.EXPO_PUBLIC_IOS_CLIENT_ID,
    androidClientId: process.env.EXPO_PUBLIC_ANDROID_CLIENT_ID,
  });

  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);
  const auth = getAuth();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (usr) => {
      setUser(usr);
      setInitializing(false);
    });
    return unsub;
  }, []);

  // Handle Google OAuth response
  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      const cred = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, cred).catch(console.error);
    }
  }, [response]);

  if (initializing) return <Loading />;

  if (!user) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ marginBottom: 20 }}>Sign in to continue</Text>
        <Button
          disabled={!request}
          title="Sign in with Google"
          onPress={() => {
            promptAsync();
          }}
        />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen} />
        {/* Additional screens/features can be added here */}
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
