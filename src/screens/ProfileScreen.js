// src/screens/ProfileScreen.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Alert,
  StatusBar,
  Image,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DEFAULT_AVATAR = 'https://via.placeholder.com/150/4a3118/aeb879?text=👤';

export default function ProfileScreen() {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState({
    name: '',
    email: '',
    address: '',
    avatar: DEFAULT_AVATAR,
  });

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const userData = await AsyncStorage.getItem('user');
      const address = await AsyncStorage.getItem('address') || '';
      const avatar = await AsyncStorage.getItem('avatar') || DEFAULT_AVATAR;
      if (userData) {
        const parsed = JSON.parse(userData);
        setUser({ ...parsed, address, avatar });
      }
    } catch (error) {
      console.warn('Erro ao carregar perfil:', error);
    }
  };

  const handleSave = async () => {
    if (!user.name.trim() || !user.email.trim()) {
      Alert.alert('Atenção', 'Nome e e-mail são obrigatórios.');
      return;
    }

    try {
      await AsyncStorage.setItem('user', JSON.stringify({ name: user.name, email: user.email }));
      await AsyncStorage.setItem('address', user.address);
      await AsyncStorage.setItem('avatar', user.avatar);
      setIsEditing(false);
      Alert.alert('Sucesso', 'Perfil atualizado!');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar as alterações.');
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('isLoggedIn');
      await AsyncStorage.removeItem('user');
      await AsyncStorage.removeItem('address');
      await AsyncStorage.removeItem('avatar');
      Alert.alert('Desconectado', 'Você saiu da sua conta.');
      // Em um app real, redirecionaria para Login
    } catch (error) {
      console.warn('Erro ao sair:', error);
    }
  };
  const changeAvatar = () => {
    const newAvatar = `https://picsum.photos/seed/${Date.now()}/200/200`;
    setUser(prev => ({ ...prev, avatar: newAvatar }));
    Alert.alert('Foto atualizada!', 'Sua foto de perfil foi alterada.');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#4a3118" barStyle="light-content" />

      {/* Cabeçalho */}
      <View style={styles.header}>
        <Text style={styles.title}>Meu Perfil</Text>
      </View>

      {/* Foto de Perfil Centralizada */}
      <View style={styles.avatarContainer}>
        <TouchableOpacity onPress={changeAvatar}>
          <Image
            source={{ uri: user.avatar }}
            style={styles.avatar}
            resizeMode="cover"
          />
          <View style={styles.cameraIcon}>
            <Text style={styles.cameraText}>📷</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Dados do Usuário */}
      {isEditing ? (
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Nome completo"
            value={user.name}
            onChangeText={(text) => setUser({ ...user, name: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="E-mail"
            value={user.email}
            onChangeText={(text) => setUser({ ...user, email: text })}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Endereço (opcional)"
            value={user.address}
            onChangeText={(text) => setUser({ ...user, address: text })}
          />
          <View style={styles.buttonRow}>
            <Pressable style={[styles.button, styles.saveButton]} onPress={handleSave}>
              <Text style={styles.buttonText}>Salvar</Text>
            </Pressable>
            <Pressable style={[styles.button, styles.cancelButton]} onPress={() => setIsEditing(false)}>
              <Text style={styles.buttonText}>Cancelar</Text>
            </Pressable>
          </View>
        </View>
      ) : (
        <View style={styles.infoSection}>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Nome:</Text>
            <Text style={styles.value}>{user.name || '—'}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>E-mail:</Text>
            <Text style={styles.value}>{user.email || '—'}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Endereço:</Text>
            <Text style={styles.value}>{user.address || 'Não informado'}</Text>
          </View>

          <Pressable style={styles.editButton} onPress={() => setIsEditing(true)}>
            <Text style={styles.editButtonText}>Editar Perfil</Text>
          </Pressable>
        </View>
      )}

      {/* Histórico de Pedidos */}
      <View style={styles.historySection}>
        <Text style={styles.sectionTitle}>Histórico de Pedidos</Text>
        <View style={styles.historyItem}>
          <Text style={styles.historyText}>• Pedido #104 – 18/10/2025 – R$ 22,60</Text>
        </View>
        <View style={styles.historyItem}>
          <Text style={styles.historyText}>• Pedido #98 – 10/10/2025 – R$ 15,30</Text>
        </View>
        <View style={styles.historyItem}>
          <Text style={styles.historyText}>• Pedido #92 – 03/10/2025 – R$ 9,50</Text>
        </View>
      </View>

      {/* Botão de Logout */}
      <Pressable style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Sair da conta</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f5f0',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4a3118',
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#aeb879',
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#4a3118',
    borderRadius: 15,
    padding: 5,
  },
  cameraText: {
    color: '#aeb879',
    fontSize: 16,
  },
  form: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#aeb879',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
  },
  infoSection: {
    marginBottom: 24,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 8,
  },
  label: {
    fontWeight: '600',
    color: '#4a3118',
    fontSize: 16,
  },
  value: {
    fontSize: 16,
    color: '#333',
    flex: 1,
    textAlign: 'right',
  },
  editButton: {
    backgroundColor: '#aeb879',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  editButtonText: {
    color: '#4a3118',
    fontWeight: 'bold',
    fontSize: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  saveButton: {
    backgroundColor: '#4a3118',
  },
  cancelButton: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  historySection: {
    marginTop: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#4a3118',
  },
  historyItem: {
    marginBottom: 8,
  },
  historyText: {
    fontSize: 15,
    color: '#555',
  },
  logoutButton: {
    marginTop: 20,
    paddingVertical: 10,
    alignItems: 'center',
  },
  logoutText: {
    color: '#d9534f',
    fontWeight: '600',
  },
});