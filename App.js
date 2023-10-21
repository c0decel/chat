import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore'
import { LogBox } from 'react-native';
LogBox.ignoreLogs(["AsyncStorage has been extracted from"]);

import Start from './components/Start';
import Chat from './components/Chat';

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

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Start"
      >
        <Stack.Screen
          name="Start"
          component={Start}
        />
        <Stack.Screen
          name="Chat"
        >
          {props => <Chat db={db} {...props} />}
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
