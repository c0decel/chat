<<<<<<< HEAD
// not currently in use

import React, { Component } from 'react';
import { View, KeyboardAvoidingView } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import RenderCustomColors from './RenderCustomColors';
import { Dialogflow_V2 } from 'react-native-dialogflow';
import { dialogflowConfig } from '../env.js';

const BOT_USER = {
  _id: 2,
  name: 'Chatbot'
}

class Bot extends Component {
  constructor(props) {
    super(props);
    const { name } = props.route.params;

  this.state = {
    messages: [
      {
        _id: 1,
        text: `Hi ${name}`,
        createdAt: new Date(),
        user: BOT_USER
      }
    ]
  };
}

componentDidMount() {
  // Set up the Dialogflow configuration
  Dialogflow_V2.setConfiguration(
    dialogflowConfig.client_email,
    dialogflowConfig.private_key,
    Dialogflow_V2.LANG_ENGLISH_US,
    dialogflowConfig.project_id
  );
}

handleGoogleResponse(result) {
  if (result && result.queryResult && result.queryResult.fulfillmentMessages) {
    let text = result.queryResult.fulfillmentMessages[0].text.text[0];
    this.sendBotResponse(text);
  } else {
    // Handle the case when the response structure is not as expected
    console.log("Invalid response from Dialogflow:", result);
  }
}


  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages)
    }));

    let message = messages[0].text;
    Dialogflow_V2.requestQuery(
      message,
      result => this.handleGoogleResponse(result),
      error => console.log(error)
    );
  }

  sendBotResponse(text) {
    let msg = {
      _id: this.state.messages.length + 1,
      text,
      createdAt: new Date(),
      user: BOT_USER
    };

    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, [msg])
    }));
  }

  render() {
    const { backgroundColor, bubbleColor } = this.props.route.params;

    return (
      <KeyboardAvoidingView style={{ flex: 1, backgroundColor: backgroundColor }}>
        <View style={{ flex: 1}}>
          <GiftedChat
            messages={this.state.messages}
            renderBubble={props => RenderCustomColors.renderBubble(props, bubbleColor)}
          renderTime={props => RenderCustomColors.renderTime(props)}
          renderDay={props => RenderCustomColors.renderDay(props)}
            onSend={messages => this.onSend(messages)}
            user={{
              _id: 1
            }}
          />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

export default Bot;
=======
import { View, Text, StyleSheet, ImageBackground } from 'react-native';

const Bot = ({  }) => {

    return (
      <ImageBackground
            source={require('../images/background.png')}
            style={styles.image}
        >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View style={styles.contentBox}>
            <Text style={{textAlign: 'center', fontSize: 18, padding: 10}}>
              Work in progress, coming soon
            </Text>
          </View>
        </View>
      </ImageBackground>
    )

}

const styles = StyleSheet.create({
  contentBox: {
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    width: '85%',
    padding: 10,
    paddingVertical: 10,
    borderColor: '#000000',
    borderWidth: 4,
    borderRadius: 20,
    marginVertical: 5
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    flex: 1
  }
})

export default Bot;
 
>>>>>>> 0c4e2a842d5b86e823559b3003deed301a35ddbe
