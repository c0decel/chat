import { TouchableOpacity, Text, View, StyleSheet, Alert }  from 'react-native';
import { useActionSheet } from '@expo/react-native-action-sheet';

import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const CustomActions = ({ wrapperStyle, iconTextStyle, onSend, storage, userID }) => {
    const actionSheet = useActionSheet();
    const onActionPress = () => {
        const options = [
            'Send your location',
            'Choose from library',
            'Take a photo',
            'Cancel'
        ];
        const cancelButtonIndex = options.length - 1;

        //Send your location
        const sendLocation = async () => {
            let permissions = await Location.requestForegroundPermissionsAsync();
            if (permissions?.granted) {
                const location = await Location.getCurrentPositionAsync({});
        
                if (location) {
                    onSend({
                        location: {
                            longitude: location.coords.longitude,
                            latitude: location.coords.latitude,
                        },
                    });
                } else Alert.alert('Error fetching location');
            } else Alert.alert('Permissions denied.');
        }

        const uploadAndSendImage = async (imageURI) => {
            const uniqueRefString = generateReference(imageURI);
            const newUploadRef = ref(storage, uniqueRefString);
            const response = await fetch(imageURI);
            const blob = await response.blob();
            uploadBytes(newUploadRef, blob).then(async (snapshot) => {
                const imageURL = await getDownloadURL(snapshot.ref)
                onSend({
                    image: imageURL
                });
            });
        }

        //Choose from library
        const pickImage = async () => {
            let permissions = await ImagePicker.requestMediaLibraryPermissionsAsync();

            if (permissions?.granted) {
                let result = await ImagePicker.launchImageLibraryAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.All
                });
                if (!result.canceled) await uploadAndSendImage(result.assets[0].uri);
                else Alert.alert('Permissions denied.');
            }
        };

        //Take a photo
        const takePhoto = async () => {
            let permissions = await ImagePicker.requestCameraPermissionsAsync();

            if (permissions?.granted) {
                let result = await ImagePicker.launchCameraAsync();
                if (!result.canceled) await uploadAndSendImage(result.assets[0].uri);
                else Alert.alert('Permissions denied.');
            }
        };

         //Generates new string per upload
         const generateReference = (uri) => {
            const timeStamp = new Date().getTime();
            const imageName = uri.split('/')[uri.split('/').length - 1];
            return `${userID}-${timeStamp}-${imageName}`;
        }

        actionSheet.showActionSheetWithOptions(
            {
                options, 
                cancelButtonIndex,
            },
            async (buttonIndex) => {
                switch (buttonIndex) {
                    case 0:
                        sendLocation();
                        return;
                    case 1: 
                        pickImage();
                        return;
                    case 2:
                        takePhoto();
                        default:
                }
            },
        );
    };
    
    return (
        <TouchableOpacity
            accessible={true}
            accessibilityLabel="More options"
            accessibilityHint="Let’s you choose to send an image or your geolocation."
            onPress={onActionPress}
        >
            <View style={[styles.wrapper, wrapperStyle]}>
                <Text style={[styles.iconText, iconTextStyle]}>+</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        width: 30,
        height: 26,
        marginLeft: 10,
        marginBottom: 10,
    },
    wrapper: {
        borderRadius: 13,
        borderColor: '#000',
        flex: 1
    },
    iconText: {
        color: '#000',
        fontSize: 20,
        padding: 10,
        textAlign: 'center'
    },
});

export default CustomActions;