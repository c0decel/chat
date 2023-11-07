import { View, TouchableOpacity, KeyboardAvoidingView, StyleSheet, Image, ImageBackground, Text, Platform } from 'react-native';

const Contacts = ({ route, navigation, isConnected }) => {
    const { name, backgroundColor, userID, bubbleColor, status } = route.params;

//open a chat
const openChat = (chat) => {
    navigation.navigate('Chat', {
        name: name,
        userID: userID,
        backgroundColor: backgroundColor,
        bubbleColor: bubbleColor,
        status: status
    });
};

const openBot = (bot) => {
    navigation.navigate('Bot', {
        name: name,
        userID: userID,
        backgroundColor: backgroundColor,
        bubbleColor: bubbleColor
    });
};


return (
    <ImageBackground
            source={require('../images/background.png')}
            style={styles.image}
        >
    <KeyboardAvoidingView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    {isConnected === false ? (
        <View style={styles.contentBox}>
                <Text style={{textAlign: 'center', fontSize: 18, padding: 10}}>Go online to join a chat</Text>
        </View>
    ) : (
        <>

        <View style={{backgroundColor: '#ffffff', justifyContent: 'center', width: '60%', padding: 20, paddingVertical: 10, borderColor: '#000000', borderWidth: 4, borderRadius: 20, marginVertical: 10}}>
            <Text style={{fontSize: 30, padding: 10, textAlign: 'center'}}>
                {name}'s Chats
            </Text>
        </View>

        <View style={styles.contentBox}>
            <TouchableOpacity
                title='Chat'
                onPress={openChat}
                style={{ flexDirection: 'row', alignItems: 'center' }}
            >
                <Image
                    source={require('../icons/group.png')}
                    style={styles.icon}
                />
                <Text style={styles.contact}>Group chat</Text>
            </TouchableOpacity>
        </View>
    </>
    )}

    </KeyboardAvoidingView>
    </ImageBackground>
);

};

const styles = StyleSheet.create({
    contentBox: {
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        width: '75%',
        padding: 20,
        paddingVertical: 10,
        borderColor: '#000000',
        borderWidth: 4,
        borderRadius: 20,
        marginVertical: 5
    },
    contact: {
        fontSize: 20,
        textAlign: 'left',
        padding: 10,
        paddingHorizontal: 20
    },
    image: {
        flex: 1
    },
    icon: {
        width: 40,
        height: 35,
        flexDirection: 'row', 
        alignItems: 'center'
    }
})

export default Contacts;