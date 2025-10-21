// src/screens/LoginScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  Alert,
  StyleSheet,
  Switch,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({ navigation }) {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleAuth = async () => {
    if (!email || !password) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    if (isRegister && !name) {
      Alert.alert('Erro', 'Nome é obrigatório no cadastro.');
      return;
    }

    try {
      if (isRegister) {
        // Simular cadastro
        await AsyncStorage.setItem('user', JSON.stringify({ name, email }));
        Alert.alert('Sucesso', 'Cadastro realizado!');
      } else {
        // Simular login (verificar se usuário existe)
        const userData = await AsyncStorage.getItem('user');
        if (!userData) {
          Alert.alert('Erro', 'Usuário não encontrado. Cadastre-se primeiro.');
          return;
        }
      }
      // Salvar email como "logado"
      await AsyncStorage.setItem('isLoggedIn', 'true');
      navigation.replace('Menu'); 
    } catch (err) {
      Alert.alert('Erro', 'Algo deu errado.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {isRegister ? 'Crie sua conta' : 'Faça login'}
      </Text>

      {isRegister && (
        <TextInput
          placeholder="Nome completo"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />
      )}

      <TextInput
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.input}
      />

      <TextInput
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      <View style={styles.toggleContainer}>
        <Text style={styles.toggleLabel}>
          {isRegister ? 'Já tem conta?' : 'Novo por aqui?'}
        </Text>
        <Switch
          value={isRegister}
          onValueChange={setIsRegister}
          trackColor={{ false: '#aeb879', true: '#4a3118' }}
          thumbColor={isRegister ? '#aeb879' : '#fff'}
        />
      </View>

      <Pressable style={styles.button} onPress={handleAuth}>
        <Text style={styles.buttonText}>
          {isRegister ? 'Cadastrar' : 'Entrar'}
        </Text>
      </Pressable>

      <Text style={styles.socialText}>Ou entre com:</Text>
      <View style={styles.socialButtons}>
        <Pressable style={[styles.socialButton, { backgroundColor: '#1877F2' }]}>
          <Text style={styles.socialButtonText}>Facebook</Text>
        </Pressable>
        <Pressable style={[styles.socialButton, { backgroundColor: '#DB4437' }]}>
          <Text style={styles.socialButtonText}>Google</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#f9f5f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#4a3118',
  },
  input: {
    borderWidth: 1,
    borderColor: '#aeb879',
    padding: 12,
    marginBottom: 15,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  toggleLabel: {
    color: '#4a3118',
  },
  button: {
    backgroundColor: '#aeb879',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#4a3118',
    fontWeight: 'bold',
    fontSize: 16,
  },
  socialText: {
    textAlign: 'center',
    marginVertical: 10,
    color: '#4a3118',
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  socialButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  socialButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});