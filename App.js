import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { initializeApp } from 'firebase/app';
import { getFirestore, disableNetwork, enableNetwork } from 'firebase/firestore'
import { LogBox, Alert } from 'react-native';
import { useEffect } from 'react';
import { useNetInfo } from '@react-native-community/netinfo';

LogBox.ignoreLogs(["AsyncStorage has been extracted from"]);

import Start from './components/Start';
import Chat from './components/Chat';
import Contacts from './components/Contacts';
import Bot from './components/Bot';
import Details from './components/Details';

const firebaseConfig = {
  apiKey: "AIzaSyCqPXwoItsC1Cs6FFZi_LGQKuqqEaqe0JQ",
  authDomain: "chat-dbe08.firebaseapp.com",
  projectId: "chat-dbe08",
  storageBucket: "chat-dbe08.appspot.com",
  messagingSenderId: "378836921744",
  appId: "1:378836921744:web:d3bc4223829c7ec57e9715",
  measurementId: "G-RWBTB4CG08"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

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
          {props => <Contacts isConnected={connectionStatus.isConnected} db={db} {...props} />}
        </Stack.Screen>
        <Stack.Screen
          name='Chat'
        >
          {props => <Chat isConnected={connectionStatus.isConnected} db={db} {...props} />}
        </Stack.Screen>
        <Stack.Screen
          name='Bot'
        >
          {props => <Bot isConnected={connectionStatus.isConnected} db={db} {...props} />}
        </Stack.Screen>
        <Stack.Screen
          name='Details'
          >
          {props => <Details isConnected={connectionStatus.isConnected} db={db} {...props} />}
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
