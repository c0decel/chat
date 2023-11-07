import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getFirestore, disableNetwork, enableNetwork } from 'firebase/firestore'
import { LogBox, Alert } from 'react-native';
import { useEffect } from 'react';
import { useNetInfo } from '@react-native-community/netinfo';

LogBox.ignoreLogs(["AsyncStorage has been extracted from"]);

import Start from './components/Start';
import Chat from './components/Chat';
import Contacts from './components/Contacts';
// import Bot from './components/Bot';
import Details from './components/Details';
import { firebaseConfig } from './env';

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

//Initialize storage
const storage = getStorage(app);

const Stack = createNativeStackNavigator();

export default function App() {
  const connectionStatus = useNetInfo();

  useEffect(() => {
    if (connectionStatus.isConnected === false) {
      Alert.alert('Connection lost');
      disableNetwork(db);
    } else if (connectionStatus.isConnected === true) {
      enableNetwork(db);
    }
  }, [connectionStatus.isConnected]);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Start'
      >
        <Stack.Screen
          name='Start'
          component={Start}
        />
        <Stack.Screen
          name='Contacts'
        >
          {props => <Contacts
            isConnected={connectionStatus.isConnected}
            db={db}
            storage={storage}
            {...props}
          />}
        </Stack.Screen>
        <Stack.Screen
          name='Chat'
        >
          {props => <Chat
            isConnected={connectionStatus.isConnected} 
            db={db}
            storage={storage}
            {...props}
          />}
        </Stack.Screen>
        <Stack.Screen
          name='Details'
          >
          {props => <Details
            isConnected={connectionStatus.isConnected}
            db={db}
            {...props}
          />}
        </Stack.Screen>

      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
});
