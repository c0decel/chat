import { useState } from 'react';
import { getAuth, signInAnonymously } from 'firebase/auth';
import { StyleSheet, View, Text, TextInput, Alert, TouchableOpacity, ImageBackground, KeyboardAvoidingView, Platform } from 'react-native';

const Start = ({ navigation, isConnected }) => {
  const [name, setName] = useState('');
  const [status, setStatus] = useState('');
  const [colorSelection, setColorSelection] = useState('');
  const [bubbleSelection, setBubbleSelection] = useState('');
  const auth = getAuth();

  const signInUser = () => {
    signInAnonymously(auth)
      .then(result => {
        const userID = result.user.uid;
        
        navigation.navigate('Contacts', {
          name: name,
          backgroundColor: colorSelection,
          bubbleColor: bubbleSelection,
          userID: userID,
          status: status,
        })
        console.log(userID)
      })
      .catch((error) => {
        Alert.alert('Unable to sign in.');
      })
  }

  return (
    <ImageBackground
            source={require('../images/background.png')}
            style={styles.image}
        >
    <KeyboardAvoidingView style={styles.container}>
        <View style={styles.contentBox}>
        <Text style={{ fontSize: 30 }}>Hello friend!</Text>
        <TextInput
            style={styles.textInput}
            value={name}
            onChangeText={setName}
            placeholder='Type your username here'
            required
        />
        <TextInput
          style={styles.textInput}
          value={status}
          onChangeText={setStatus}
          placeholder='Set status (optional)'
        />

        <Text>Choose background color:</Text>
        <View style={styles.colorContainer}>
            {['#82ffae', '#9cfffa', '#fff382', '#ff9cc3', '#c980f2'].map((bgColor, index) => (
            <TouchableOpacity
                key={index}
                style={[
                styles.choices,
                { backgroundColor: bgColor },
                colorSelection === bgColor && styles.selectedColor,
                ]}
                onPress={() => setColorSelection(bgColor)}
            />
            ))}
        </View>

        <Text>Choose text bubble color:</Text>
        <View style={styles.colorContainer}>
            {['#e9c2ff', '#c9fdff', '#fcffa8'].map((bubbleSelection, index) => (
            <TouchableOpacity
                key={index}
                style={[
                styles.choices,
                { backgroundColor: bubbleSelection },
                bubbleSelection === bubbleSelection && styles.bubbleColor,
                ]}
                onPress={() => setBubbleSelection(bubbleSelection)}
            />
            ))}
        </View>

        <TouchableOpacity style={{backgroundColor: '#c47dff', padding: 5, borderColor: '#000000', borderWidth: 2, margin: 10, borderRadius: 20}}
            title="Start Chatting"
            onPress={signInUser}
        >
            <Text style={{fontSize: 15}}>Start chatting</Text>
        </TouchableOpacity>
        </View>
    </KeyboardAvoidingView>
    {Platform.OS === 'ios' ? (
        <KeyboardAvoidingView behavior='padding' />
      ) : null}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    width: 200,
    padding: 15,
    borderWidth: 1,
    marginTop: 10,
    marginBottom: 5,
    backgroundColor: '#ffffff',
    borderRadius: 20
  },
  selectedColor: {
    borderColor: '#000000',
  },
  bubbleColor: {
    borderColor: '#00000',
  },
  choices: {
    borderRadius: 25,
    width: 50,
    height: 50,
    marginHorizontal: 10,
    borderColor: '#000000',
    borderWidth: 2
  },
  colorContainer: {
    flexDirection: 'row',
    margin: 5,
    justifyContent: 'space-between',
  },
  image: {
    flex: 1
  },
  contentBox: {
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 1,
    paddingVertical: 10,
    borderColor: '#000000',
    borderWidth: 4,
    borderRadius: 20
  }
});

export default Start;
