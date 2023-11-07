<<<<<<< HEAD
import { View, StyleSheet, Text } from 'react-native';

const Details = ({ route }) => {
    const { user, backgroundColor } = route.params;

    return (
        <View style={[styles.container, {backgroundColor: backgroundColor}]}>
            <View style={styles.contentBox}>
                <Text style={{fontSize: 40, padding: 5}}>{user.name}</Text>
                <Text style={{fontSize: 20, padding: 5}}>{user.status}</Text>
            </View>
        </View>
    );
  };

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff'
    },
    contentBox: {
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30,
        paddingVertical: 10,
        borderColor: '#000000',
        borderWidth: 4,
        borderRadius: 20
    },
    avatar: {
        width: 100, // Adjust these dimensions according to your layout
        height: 100,
        borderRadius: 50, // Assuming a circular avatar
      }
})

=======
import { View, StyleSheet, Text } from 'react-native';

const Details = ({ route }) => {
    const { user, backgroundColor } = route.params;

    return (
        <View style={[styles.container, {backgroundColor: backgroundColor}]}>
            <View style={styles.contentBox}>
                <Text style={{fontSize: 40, padding: 5}}>{user.name}</Text>
                <Text style={{fontSize: 20, padding: 5}}>{user.status}</Text>
            </View>
        </View>
    );
  };

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff'
    },
    contentBox: {
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30,
        paddingVertical: 10,
        borderColor: '#000000',
        borderWidth: 4,
        borderRadius: 20
    },
    avatar: {
        width: 100, // Adjust these dimensions according to your layout
        height: 100,
        borderRadius: 50, // Assuming a circular avatar
      }
})

>>>>>>> 0c4e2a842d5b86e823559b3003deed301a35ddbe
export default Details;