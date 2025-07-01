
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { View, Text, Button, ActivityIndicator, StyleSheet } from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import firebaseConfig from './firebaseConfig';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const Drawer = createDrawerNavigator();

// Configure Google Sign In
GoogleSignin.configure({
  webClientId: 'your-google-client-id-here.apps.googleusercontent.com',
  offlineAccess: true,
  hostedDomain: '',
  forceCodeForRefreshToken: true,
});

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
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (usr) => {
      setUser(usr);
      if (initializing) setInitializing(false);
    });
    return unsubscribe;
  }, [initializing]);

  const signInWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const { idToken } = await GoogleSignin.signIn();
      
      const googleCredential = GoogleAuthProvider.credential(idToken);
      await signInWithCredential(auth, googleCredential);
    } catch (error) {
      console.error('Google Sign-In error:', error);
    }
  };

  if (initializing) return <Loading />;

  if (!user) {
    return <SignInScreen onSignIn={signInWithGoogle} />;
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
