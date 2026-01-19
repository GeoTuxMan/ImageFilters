import { StatusBar } from 'expo-status-bar';
import { Text, View, TouchableOpacity, Dimensions, ScrollView, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import Slider from '@react-native-community/slider';
import React, { useState } from 'react';


const ScreenWidth = Dimensions.get('window').width;

export default function App() {
  const [image, setImage] = useState<string | null>(null);
  const [blur, setBlur] = useState(0);
  const [grayscale, setGrayscale] = useState(0); // 0 to 1
  const [saturation, setSaturation] = useState(1); // 0 to 2 (1 is normal)

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const imageStyle = {
    width: 300,
    height: 300,
    borderRadius: 10,
    // @ts-ignore
    filter: `grayscale(${grayscale * 100}%) saturate(${saturation * 100}%)`, // For Web
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ImgFilters</Text>

      <TouchableOpacity
        onPress={pickImage}
        style={styles.imageContainer}
      >
        {image ? (
          <Image
            source={{ uri: image }}
            style={imageStyle}
            contentFit="cover"
            blurRadius={blur}
          />
        ) : (
          <View style={styles.placeholderContainer}>
            <Text style={styles.plusSign}>+</Text>
            <Text style={styles.placeholderText}>Select Image</Text>
          </View>
        )}
      </TouchableOpacity>

      {/* Controls */}
      <View style={styles.controlsContainer}>
        <View>
          <View style={styles.labelContainer}>
            <Text style={styles.labelText}>Blur: {blur.toFixed(1)} px</Text>
          </View>
          <Slider
            style={{ width: '100%', height: 40 }}
            minimumValue={0}
            maximumValue={20}
            minimumTrackTintColor="#3b82f6"
            maximumTrackTintColor="#555"
            thumbTintColor="#3b82f6"
            value={blur}
            onValueChange={setBlur}
          />
        </View>

        <View>
          <View style={styles.labelContainer}>
            <Text style={styles.labelText}>Grayscale: {(grayscale * 100).toFixed(0)}%</Text>
            <Text style={styles.webOnlyText}>(Web Only)</Text>
          </View>
          <Slider
            style={{ width: '100%', height: 40 }}
            minimumValue={0}
            maximumValue={1}
            minimumTrackTintColor="#a855f7"
            maximumTrackTintColor="#555"
            thumbTintColor="#a855f7"
            value={grayscale}
            onValueChange={setGrayscale}
          />
        </View>

        <View>
          <View style={styles.labelContainer}>
            <Text style={styles.labelText}>Saturation: {saturation.toFixed(1)}x</Text>
            <Text style={styles.webOnlyText}>(Web Only)</Text>
          </View>
          <Slider
            style={{ width: '100%', height: 40 }}
            minimumValue={0}
            maximumValue={2}
            minimumTrackTintColor="#ef4444"
            maximumTrackTintColor="#555"
            thumbTintColor="#ef4444"
            value={saturation}
            onValueChange={setSaturation}
          />
        </View>
      </View>

      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    paddingTop: 80, // pt-20
    paddingHorizontal: 20, // px-5
  },
  title: {
    fontSize: 30, // 3xl
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 32, // mb-8
  },
  imageContainer: {
    backgroundColor: '#262626', // neutral-800
    width: '100%',
    height: 320, // h-80
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12, // xl
    borderWidth: 1,
    borderColor: '#404040', // neutral-700
    marginBottom: 32, // mb-8
    overflow: 'hidden',
  },
  placeholderContainer: {
    alignItems: 'center',
  },
  plusSign: {
    color: '#a3a3a3', // neutral-400
    fontSize: 60, // 6xl
    marginBottom: 16, // 4
  },
  placeholderText: {
    color: '#a3a3a3', // neutral-400
    fontWeight: '500', // medium
  },
  controlsContainer: {
    width: '100%',
    backgroundColor: '#171717', // neutral-900
    padding: 24, // p-6
    borderRadius: 12, // xl
    gap: 24, // 6
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8, // 2
  },
  labelText: {
    color: 'white',
    fontWeight: 'bold',
  },
  webOnlyText: {
    color: '#737373', // neutral-500
    fontSize: 12, // xs
  },
});
