import { View, Text, TouchableOpacity, SafeAreaView, Alert, Image, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { FIREBASE_AUTH, firebase } from '../../firebaseConfig';
import { useRouter } from 'expo-router';
import { useWindowDimensions } from 'react-native';

const auth = FIREBASE_AUTH;

const UploadMediaFile = () => {
    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [profileImage, setProfileImage] = useState(null);
    const router = useRouter();
    const {height, width} = useWindowDimensions();

    useEffect(() => {
        // Fetch the current user's profile image on component mount
        fetchProfileImage();
    
        // Clean up function to remove listeners or perform other cleanup
        return () => {
          // Any cleanup code, if needed
        };
    }, []);

    const fetchProfileImage = async () => {
        const authUser = auth.currentUser;
      
        if (authUser) {
          const userEmail = authUser.email;
      
          const storageRef = firebase.storage().ref().child(`${userEmail}`);
          try {
            const downloadURL = await storageRef.getDownloadURL();
            setProfileImage(downloadURL);
          } catch (error) {
            console.error('Error fetching profile image:', error.message);
            // Handle error fetching the profile image
          }
        }
      };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4,3],
            quality: 1,
        });

        if(!result.canceled) {
            setImage(result.assets[0].uri);
        }
    }

    const uploadMedia = async () => {
        setUploading(true);
        try {
            const { uri } = await FileSystem.getInfoAsync(image);
            const blob = await new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.onload = () => {
                    resolve(xhr.response);
                };
                xhr.onerror = (e) => {
                    reject(new TypeError('Network request failed'));
                };
                xhr.responseType = 'blob';
                xhr.open('GET', uri, true);
                xhr.send(null);
            });
            
            const authUser = auth.currentUser;

            if (authUser) {
                const userEmail = authUser.email;
                const filename = userEmail; // Use the email directly as the filename
                const newPhotoRef = firebase.storage().ref().child(filename);

                await newPhotoRef.put(blob);
                
                await fetchProfileImage();
                setUploading(false);
                Alert.alert('Photo Uploaded');
                setImage(null);
              } else {
                // Handle the case where there is no authenticated user
                console.error('No authenticated user');
              }
        } catch (error) {
            console.error(error);
            setUploading(false);
        }
    }; 

  return (
    <SafeAreaView style={{width: width, height: height}}>
      <View style={{alignItems: 'center', alignSelf: 'center', marginTop: 20}}>
        <Text>Change profile picture</Text>
      </View>

      <TouchableOpacity onPress={pickImage} style={{alignItems: 'center', borderWidth: 1, borderColor: "black", width: 100, alignSelf: 'center', marginTop: 20}}>
        <Text>Select Image</Text>
      </TouchableOpacity>

      <View style={{alignItems: 'center', alignSelf: 'center', marginTop: 20}}>
        {image && <Image source={{uri: image}} style={{width: 300, height: 300}}/>}
      </View>

      <TouchableOpacity onPress={uploadMedia} style={{alignItems: 'center', borderWidth: 1, borderColor: "black", width: 100, alignSelf: 'center', marginTop: 20}}>
        <Text>Upload Image</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default UploadMediaFile 