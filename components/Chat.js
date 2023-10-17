import { useEffect, useState } from 'react';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import { StyleSheet, View, KeyboardAvoidingView, Platform, Text } from 'react-native';
import { TouchableOpacity, onPress } from 'react-native';

const Chat = ({ route, navigation }) => {
  const [messages, setMessages] = useState([]);
  const { name, backgroundColor } = route.params;

  const onSend = (newMessages) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages))
  }

  useEffect(() => {
    navigation.setOptions({ title: name });
  }, []);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hi friend',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'react native',
          avatar: 'https://placeimg.com/140/140/any'
        },
      },
      {
        _id: 2,
        text: 'New chat',
        createdAt: new Date(),
        system: true,
      },
    ]);
  }, []);


 return (
  <KeyboardAvoidingView style={{ flex: 1, backgroundColor: backgroundColor }}>
    <Text style={{textAlign: 'center', fontSize: 20, padding: 20}}>{name} started a chat</Text>
     <GiftedChat
        messages = {messages}
        renderBubble={renderBubble}
        onSend={newMessages => onSend(newMessages)}
        user ={{
          _id: 1
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
          backgroundColor: "#d78cff",
          borderColor: '#000',
          borderWidth: 2
        },
        left: {
          backgroundColor: "#FFF",
          borderColor: '#000',
          borderWidth: 2
        },
      }}
    />
  );
    };

export default Chat;