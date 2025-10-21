import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Pressable,
  Text,
  Animated,
  Dimensions,
} from 'react-native';
import { Video } from 'expo-av';

const { width, height } = Dimensions.get('window');

export default function SplashScreen({ navigation }) {
  const [videoFinished, setVideoFinished] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current; 

  const onVideoStatusUpdate = (status) => {
    if (status.isLoaded && status.didJustFinish) {
      setVideoFinished(true);
    }
    // Se o vídeo falhar (link quebrado, etc.)
    if (status.isLoaded === false && status.error) {
      console.error("Erro ao carregar o vídeo:", status.error);
      setVideoFinished(true); 
    }
  };

  useEffect(() => {
    if (videoFinished) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800, 
        useNativeDriver: true,
      }).start();
    }
  }, [videoFinished, fadeAnim]);

  // Função para navegar para a tela de Login
  const handlePressEnter = () => {
    navigation.replace('Login');
  };

  return (
    <View style={styles.container}>
      <Video
        source={{ uri: 'https://res.cloudinary.com/ds4nhhgrg/video/upload/v1760889389/Coffee_Imagem_de_fundo_de_tela_para_celular_1_aufzhj.mp4' }}
        
        style={styles.video}
        
        resizeMode="cover" 
        
        shouldPlay={true}
        isMuted={true} 

        isLooping={false} 
        
        onPlaybackStatusUpdate={onVideoStatusUpdate}
      />

      <View style={styles.buttonContainer}>
        {videoFinished && (
          <Animated.View style={{ opacity: fadeAnim }}>
            <Pressable style={styles.button} onPress={handlePressEnter}>
              <Text style={styles.buttonText}>Iniciar</Text>
            </Pressable>
          </Animated.View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    width: width,
    height: height,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: height * 0.15,
    width: '100%',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#aeb879', 
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 30,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    color: '#3e2723', 
    fontSize: 18,
    fontWeight: 'bold',
  },
});