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
 