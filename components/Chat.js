import { useEffect, useState } from 'react';
import { GiftedChat, InputToolbar } from 'react-native-gifted-chat';
import { View, KeyboardAvoidingView, StyleSheet, Text } from 'react-native';
import { addDoc, query, onSnapshot, collection, orderBy } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomActions from './CustomActions';
import MapView from 'react-native-maps';
import RenderCustomColors from './RenderCustomColors';

const Chat = ({ route, navigation, db, isConnected, storage }) => {
  const [messages, setMessages] = useState([]);
  const { name, backgroundColor, bubbleColor, userID, status } = route.params;
  const [visible, setVisible] = useState(true);

  let unsubMessage;

  useEffect(() => {
    navigation.setOptions({ title: name });

    if (isConnected === true) {
      if (unsubMessage) unsubMessage();
      unsubMessage = null;

      const q = query(collection(db, 'messages'), orderBy('createdAt', 'desc'));
      unsubMessage = onSnapshot(q, (docs) => {
        let newMessages = [];
        docs.forEach((doc) => {
          newMessages.push({
            id: doc.id,
            ...doc.data(),
            createdAt: new Date(doc.data().createdAt.toMillis()),
          });
        });
        cachedMessages(newMessages);
        setMessages(newMessages);
      });
    } else loadFromCache();

    return () => {
      if (unsubMessage) {
        unsubMessage();
      }
    };
  }, [isConnected]);

  //Load cached messages
  const loadFromCache = async () => {
    const cachedMessages = (await AsyncStorage.getItem('messages')) || '[]';
    setMessages(JSON.parse(cachedMessages));
  };

  const cachedMessages = async (messagesToCache) => {
    try {
      await AsyncStorage.setItem('messages', JSON.stringify(messagesToCache));
    } catch (error) {
      console.log(error.message);
    }
  };

  //Add messages to collection
  const onSend = (newMessages) => {
    addDoc(collection(db, 'messages'), newMessages[0]);    
  };

  //Show user details
  const onPressAvatar = (user) => {
    console.log('Avatar clicked:', user);

    navigation.navigate('Details', { 
      user: {
        name: user.name,
        status: user.status
      },
      backgroundColor: backgroundColor
    });
  };


  //Renders toolbar if there is a connection
  const renderInputToolbar = (props) => {
    if (isConnected) return <InputToolbar {...props} />;
    else return (
      <View>
        <Text style={{fontSize: 16, paddingVertical: 4, textAlign: 'center'}}>
          Go online to compose a message
        </Text>
      </View>
    )
   };

  //Render custom actions
  const renderCustomActions = (props) => {
    return <CustomActions storage={storage} {...props} />;
  };

  //Render custom view
  const renderCustomView = (props) => {
    const { currentMessage } = props;
    if (currentMessage.location) {
      return (
        <MapView
          style={{
          width: 150,
          height: 100,
          borderRadius: 13,
          margin: 3        
        }}
          region={{
            latitude: currentMessage.location.latitude,
            longitude: currentMessage.location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      );
    }
    return null;
  }

  //Puts timer on joined message
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 5000);
    return () => {
      clearTimeout(timer);
    }
  }, []);

 return (
  <KeyboardAvoidingView style={{ flex: 1, backgroundColor: backgroundColor }}>
    <View>
      {visible && <Text style={{textAlign: 'center', fontSize: 18, padding: 10}}>{name} joined the chat. Say something!!!</Text>}
    </View>
     <GiftedChat style={styles.messagestext}
        messages = {messages}
        renderBubble={props => RenderCustomColors.renderBubble(props, bubbleColor)}
        renderTime={props => RenderCustomColors.renderTime(props)}
        renderDay={props => RenderCustomColors.renderDay(props)}
        onSend={newMessages => onSend(newMessages)}
        onPressAvatar={(user) => onPressAvatar(user)}
        renderActions={renderCustomActions}
        renderCustomView={renderCustomView}
        user ={{
          _id: userID,
          name: name,
          status: status
        }}
        renderInputToolbar={renderInputToolbar}
      />
   </KeyboardAvoidingView>
 );
}

const styles = StyleSheet.create({
  messagestext: {
    color: '#000'
  },
  details: {
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    borderColor: '#000000',
    borderWidth: 4
  }
})

export default Chat;