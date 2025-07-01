
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { View, Text, Button, ActivityIndicator, StyleSheet } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import firebaseConfig from './firebaseConfig';

// Complete the auth session for web browser
WebBrowser.maybeCompleteAuthSession();

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const Drawer = createDrawerNavigator();

function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to WYN Remnants</Text>
      <Text style={styles.subtitle}>Furry Food Finds</Text>
    </View>
  );
}

function Loading() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#0000ff" />
      <Text style={styles.loadingText}>Loading...</Text>
    </View>
  );
}

function SignInScreen({ onSignIn }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>WYN Remnants</Text>
      <Text style={styles.subtitle}>Sign in to continue</Text>
      <Button
        title="Sign in with Google"
        onPress={onSignIn}
      />
    </View>
  );
}

export default function App() {
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID || "demo-client-id",
    iosClientId: process.env.EXPO_PUBLIC_IOS_CLIENT_ID || "demo-ios-client-id",
    androidClientId: process.env.EXPO_PUBLIC_ANDROID_CLIENT_ID || "demo-android-client-id",
  });

  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (usr) => {
      setUser(usr);
      if (initializing) setInitializing(false);
    });
    return unsubscribe;
  }, [initializing]);

  // Handle Google OAuth response
  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      if (id_token) {
        const credential = GoogleAuthProvider.credential(id_token);
        signInWithCredential(auth, credential).catch((error) => {
          console.error('Sign in error:', error);
        });
      }
    }
  }, [response]);

  if (initializing) return <Loading />;

  if (!user) {
    return (
      <SignInScreen 
        onSignIn={() => {
          if (request) {
            promptAsync();
          }
        }} 
      />
    );
  }

  return (
    <NavigationContainer>
      <Drawer.Navigator 
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#4CAF50',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Drawer.Screen 
          name="Home" 
          component={HomeScreen}
          options={{
            title: 'WYN Remnants'
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    color: '#666',
    textAlign: 'center',
  },
  loadingText: {
    marginTop: 10,
    color: '#666',
  },
});
