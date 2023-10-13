import { useState } from 'react';
import { StyleSheet, View, Text, Button, TextInput, TouchableOpacity, ImageBackground } from 'react-native';

const Start = ({ navigation }) => {
  const [name, setName] = useState('');
  const [colorSelection, setColorSelection] = useState('');

  return (
    <ImageBackground
            source={require('../images/background.png')}
            style={styles.image}
        >
    <View style={styles.container}>
        <View style={styles.contentBox}>
        <Text style={{ fontSize: 30 }}>Hello friend!</Text>
        <TextInput
            style={styles.textInput}
            value={name}
            onChangeText={setName}
            placeholder='Type your username here'
        />
        <Text>Choose background color:</Text>
        <View style={styles.colorContainer}>
            {['#ffee6e', '#adfbff', '#ffa6f6', '#d7a6ff', '#ccffa6'].map((color, index) => (
            <TouchableOpacity
                key={index}
                style={[
                styles.choices,
                { backgroundColor: color },
                colorSelection === color && styles.selectedColor,
                ]}
                onPress={() => setColorSelection(color)}
            />
            ))}
        </View>
        <TouchableOpacity style={{backgroundColor: '#c47dff', padding: 5, borderColor: '#000000', borderWidth: 2, margin: 10, borderRadius: 20}}
            title="Start Chatting"
            onPress={() => navigation.navigate('Chat', {
            name: name,
            backgroundColor: colorSelection,
            })}
        >
            <Text style={{fontSize: 15}}>Start chatting</Text>
        </TouchableOpacity>
        </View>
    </View>
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
    marginTop: 20,
    marginBottom: 15,
    backgroundColor: '#ffffff',
    borderRadius: 20
  },
  selectedColor: {
    borderColor: '#000000',
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
