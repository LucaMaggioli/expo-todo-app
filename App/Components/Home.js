import React from 'react';
import { Dimensions, Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import logo from './../assets/logo.png'; 
import * as ImagePicker from 'expo-image-picker';
import TodoPage from './TodoPage';

export default function Home() {

  const [isHover, setIsHover] = useState(false);
  const [selectedImage, setSelectedImage] = React.useState(null);
  const [height, setHeight] = React.useState( Dimensions.get('window').height);
  const [width, setWidth] = React.useState( Dimensions.get('window').width);

  useEffect(() => {
    function handleResize() {
      setHeight(Dimensions.get('window').height);
      setWidth(Dimensions.get('window').width);
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);



  let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    console.log(pickerResult);

    if (pickerResult.cancelled === true) {
      return;
    }

    setSelectedImage({ localUri: pickerResult.uri });
  }

  const styles = StyleSheet.create({
    basicText: {
      textDecorationLine: isHover?'underline':'line-through',
      textShadowColor: '#B7D3F2',
      textShadowRadius: 6,
      textTransform: isHover?'uppercase':'none'
    },
    logo: {
      width: 280,
      height: 120,
      marginBottom: 20,
      borderRadius: 20
    },
    button: {
      backgroundColor: '#B7D3F2',
      padding: 20,
      borderRadius: 20,
    },
    buttonText: {
      fontSize: 20,
      color: '#8A84E2',
    },
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    thumbnail: {
      width: 300,
      height: 300,
      resizeMode: "contain"
    }
  }); 

  if (selectedImage !== null) {
    return (
      <View style={styles.container}>
        <Image
          source={{ uri: selectedImage.localUri }}
          style={styles.thumbnail}
        />
        <TouchableOpacity
          onPress={()=>{setSelectedImage(null)}}
          style={styles.button}>
            <Text style={styles.buttonText}>Exit</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} /> 
      <Text>height: {height}</Text>
      <Text>width: {width}</Text>
      <Text
        style={{...styles.basicText, ...{color: '#888', fontSize: 18, letterSpacing: 6} }}
        onMouseEnter={()=>{setIsHover(true)}}
        onMouseLeave={()=>{setIsHover(false)}}>
                To share a photo from your phone with a friend, just press the button below!
        </Text>
        <TouchableOpacity
          onPress={openImagePickerAsync}
          style={styles.button}>
            <Text style={styles.buttonText}>Pick a photo</Text>
        </TouchableOpacity>
        <TodoPage></TodoPage>
    </View>
  );
}



