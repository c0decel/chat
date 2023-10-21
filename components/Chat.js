import { useEffect, useState } from 'react';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import { View, KeyboardAvoidingView, Text, StyleSheet, Alert } from 'react-native';
import { addDoc, query, onSnapshot, collection } from 'firebase/firestore';

const Chat = ({ route, navigation, db }) => {
  const [messages, setMessages] = useState([]);
  const { name, backgroundColor, userID } = route.params;
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    navigation.setOptions({ title: name });
  }, [name, navigation]);

  useEffect(() => {
    const messageQuery = query(
      collection(db, 'messages'),
    );
  
    const unsubMessage = onSnapshot(messageQuery, (Snapshot) => {
      const fetchedMessages = Snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          _id: doc.id,
          text: data.text,
          createdAt: data.createdAt.toDate(),
          user: {
            _id: data.user._id,
            name: data.user.name
          },
        };
      });
  
      fetchedMessages.sort((a, b) => b.createdAt - a.createdAt);
  
      setMessages(fetchedMessages);
    });
  
    return () => unsubMessage();
  }, [db]);

  const onSend = (newMessages) => {
    addDoc(collection(db, 'messages'), newMessages[0])
  };

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
      {visible && <Text style={{textAlign: 'center', fontSize: 18, padding: 5}}>{name} joined the chat. Say something!!!</Text>}
      {visible && <Text style={{textAlign: 'center', padding: 5}}>User ID: {userID}</Text>}
    </View>
     <GiftedChat
        messages = {messages}
        renderBubble={renderBubble}
        onSend={newMessages => onSend(newMessages)}
        user ={{
          _id: userID,
          name: name
        }}
      />
   </KeyboardAvoidingView>
 );
}

const renderBubble = (props) => {
  return (
    <Bubble
      {...props}
      wrapperStyle={{
        right: {
          backgroundColor: '#d78cff',
          borderColor: '#000',
          borderWidth: 2
        },
        left: {
          backgroundColor: '#FFF',
          borderColor: '#000',
          borderWidth: 2
        },
      }}
    />
  );
};

export default Chat;