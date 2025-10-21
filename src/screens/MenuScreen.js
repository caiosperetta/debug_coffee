// src/screens/MenuScreen.js
import React from 'react';
import {
  View,
  Text,
  FlatList,
  Pressable,
  StyleSheet,
  Image,
} from 'react-native';
import { useCart } from '../context/CartContext';
import { menuItems } from '../data/menuData';
import { Ionicons } from '@expo/vector-icons';
import profileIcon from '../../assets/images/profileIcon.png'; 

export default function MenuScreen({ navigation }) {
  const { addToCart, totalItemsInCart } = useCart();

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={item.image} style={styles.image} resizeMode="cover" />

      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.price}>R$ {item.price.toFixed(2)}</Text>
        <Pressable style={styles.addButton} onPress={() => addToCart(item)}>
          <Text style={styles.addButtonText}>Adicionar</Text>
        </Pressable>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>☕ Nosso Cardápio</Text>
      <FlatList
        data={menuItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />

      <Pressable
        style={[styles.floatingButton, { left: 20 }]}
        onPress={() => navigation.navigate('Cart')}>
        <Ionicons name="cart" size={24} color="#aeb879" />
        {totalItemsInCart > 0 && (
          <View style={styles.cartBadge}>
            <Text style={styles.cartBadgeText}>{totalItemsInCart}</Text>
          </View>
        )}
      </Pressable>

      <Pressable
        style={[styles.profileButtonImage, { right: 20 }]}
        onPress={() => navigation.navigate('Profile')}
      >
        <Image source={profileIcon} style={styles.profileImageFull} /> 
      </Pressable>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9f5f0', padding: 10 },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
    color: '#4a3118',
  },
  list: { paddingBottom: 80 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginVertical: 8,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  image: { width: 80, height: 80, borderRadius: 8, marginRight: 12 },
  info: { flex: 1, justifyContent: 'center' },
  name: { fontSize: 16, fontWeight: 'bold', color: '#4a3118' },
  description: { fontSize: 13, color: '#666', marginVertical: 4 },
  price: { fontSize: 15, fontWeight: '600', color: '#aeb879' },
  addButton: {
    backgroundColor: '#aeb879',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginTop: 6,
  },
  addButtonText: { color: '#4a3118', fontWeight: 'bold' },

  floatingButton: {
    position: 'absolute',
    bottom: 20,
    backgroundColor: '#4a3118',
    padding: 12,
    borderRadius: 30,
    height: 56,
    width: 56,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  profileButtonImage: {
    position: 'absolute',
    bottom: 20,
    height: 56,
    width: 56,
    borderRadius: 28,
    overflow: 'hidden',

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  profileImageFull: {
    width: '100%', 
    height: '100%',
    resizeMode: 'cover',
  },

  cartBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#e74c3c',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});