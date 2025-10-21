import React, { useEffect, useState, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
  Animated,
  Platform,
  Dimensions,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import { Video } from 'expo-av';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const { width, height, fontScale } = Dimensions.get('window');
const Stack = createStackNavigator();

const getCardType = (number) => {
  const clean = number.replace(/\D/g, '');
  if (/^4/.test(clean)) return 'visa';
  if (/^5[1-5]/.test(clean) || /^2[2-7]/.test(clean)) return 'mastercard';
  if (/^3[47]/.test(clean)) return 'amex';
  if (
    /^6011|^622(12[6-9]|1[3-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9]|6[0-9]|7[0-9]|8[0-9]|9[0-9])|^64[4-9]|^65/.test(
      clean
    )
  )
    return 'discover';
  return 'unknown';
};

const CARD_STYLES = {
  visa: { bg: '#1a4687', brand: 'VISA', color: '#fff' },
  mastercard: { bg: '#eb001b', brand: 'Mastercard', color: '#fff' },
  amex: { bg: '#000', brand: 'American Express', color: '#fff' },
  discover: { bg: '#ff6000', brand: 'Discover', color: '#fff' },
  unknown: { bg: '#3e2723', brand: 'Cartão', color: '#fff' },
};

function SplashScreen({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => navigation.replace('Carrinho'), 4000);
    return () => clearTimeout(timer);
  }, [navigation]); 

  return (
    <View style={styles.container}>
      <Video
        source={{
          uri: 'https://res.cloudinary.com/ds4nhhgrg/video/upload/v1760889389/Coffee_Imagem_de_fundo_de_tela_para_celular_1_aufzhj.mp4',
        }}
        rate={0.8}
        volume={0.5}
        isMuted
        resizeMode="cover"
        shouldPlay
        isLooping
        style={StyleSheet.absoluteFill}
      />
      <View style={styles.overlay}></View>
    </View>
  );
}

// --- Carrinho ---
function CartScreen({ navigation }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const cartItems = [
    { id: '1', name: 'Café Expresso', price: 7.9, quantity: 1 },
    { id: '2', name: 'Cappuccino', price: 9.5, quantity: 2 },
    { id: '3', name: 'Croissant de Amêndoas', price: 6.0, quantity: 1 },
  ];

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <Animated.View style={[styles.screenContainer, { opacity: fadeAnim }]}>
      <Text style={styles.screenTitle}>🛒 Seu Carrinho</Text>

      <View style={styles.cartList}>
        {cartItems.map((item) => (
          <View key={item.id} style={styles.cartItem}>
            <View style={styles.itemContent}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemMeta}>Quantidade: {item.quantity}</Text>
            </View>
            <Text style={styles.itemPrice}>
              R$ {(item.price * item.quantity).toFixed(2)}
            </Text>
          </View>
        ))}
      </View>

      <View style={styles.totalCard}>
        <Text style={styles.totalLabel}>Total do Pedido</Text>
        <Text style={styles.totalValue}>R$ {total.toFixed(2)}</Text>
      </View>

      <TouchableOpacity
        style={styles.primaryButton}
        onPress={() => navigation.navigate('Pagamento')}>
        <Text style={styles.buttonText}>Finalizar Compra</Text>
      </TouchableOpacity>

      <Text style={styles.footer}>☕ Coffee Shop App</Text>
    </Animated.View>
  );
}

// --- Métodos de Pagamento ---
function PaymentScreen({ navigation }) {
  const slideAnim = useRef(new Animated.Value(100)).current;

  useEffect(() => {
    Animated.spring(slideAnim, {
      toValue: 0,
      friction: 8,
      tension: 40,
      useNativeDriver: true,
    }).start();
  }, [slideAnim]);

  return (
    <View style={styles.screenContainer}>
      <Animated.View style={{ transform: [{ translateY: slideAnim }] }}>
        <Text style={styles.screenTitle}>💳 Escolha o Pagamento</Text>

        <TouchableOpacity
          style={styles.paymentOption}
          onPress={() => navigation.navigate('CardPayment')}>
          <Text style={styles.paymentOptionText}>💳 Cartão de Crédito</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.paymentOption}
          onPress={() =>
            Alert.alert('✅ Pix!', 'Pagamento via Pix confirmado com sucesso!')
          }>
          <Text style={styles.paymentOptionText}>📱 Pix</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.paymentOption}
          onPress={() =>
            Alert.alert('✅ Dinheiro!', 'Pagamento em dinheiro confirmado!')
          }>
          <Text style={styles.paymentOptionText}>💵 Dinheiro</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>← Voltar ao Carrinho</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

// --- Pagamento com Cartão ---
function CardPaymentScreen({ navigation }) {
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const flipAnim = useRef(new Animated.Value(0)).current;

  const cardType = getCardType(cardNumber);
  const cardStyle = CARD_STYLES[cardType] || CARD_STYLES.unknown;

  const frontRotate = flipAnim.interpolate({
    inputRange: [0, 180],
    outputRange: ['0deg', '180deg'],
  });
  const backRotate = flipAnim.interpolate({
    inputRange: [0, 180],
    outputRange: ['180deg', '360deg'],
  });

  const handleFocusCVV = () => {
    Animated.spring(flipAnim, {
      toValue: 180,
      friction: 8,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };
  const handleBlurCVV = () => {
    Animated.spring(flipAnim, {
      toValue: 0,
      friction: 8,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  const handleConfirm = () => {
    if (!cardNumber || !expiry || !cvv)
      return Alert.alert('⚠️ Erro', 'Preencha todos os campos do cartão.');
    navigation.navigate('OrderConfirmation', {
      last4: cardNumber.replace(/\D/g, '').slice(-4),
    });
  };

  const formatCardNumber = (value) =>
    value
      .replace(/\D/g, '')
      .slice(0, 16)
      .replace(/(\d{4})/g, '$1 ')
      .trim();

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView contentContainerStyle={styles.screenContainer}>
        <Text style={styles.screenTitle}>💳 Pagamento com Cartão</Text>

        <View style={styles.cardVisual}>
          <Animated.View
            style={[
              styles.cardFaceCommon,
              { backgroundColor: cardStyle.bg },
              { transform: [{ rotateY: frontRotate }] },
            ]}>
            <Text style={[styles.cardBrand, { color: cardStyle.color }]}>
              {cardStyle.brand}
            </Text>
            <Text style={[styles.cardNumber, { color: cardStyle.color }]}>
              {cardNumber || '•••• •••• •••• ••••'}
            </Text>
            <View style={styles.cardFooter}>
              <Text style={[styles.cardHolder, { color: '#fff' }]}>
                NOME DO CLIENTE
              </Text>
              <Text style={[styles.cardExpiry, { color: cardStyle.color }]}>
                {expiry || 'MM/AA'}
              </Text>
            </View>
          </Animated.View>

          <Animated.View
            style={[
              styles.cardFaceCommon,
              styles.cardFaceBack,
              { transform: [{ rotateY: backRotate }] },
            ]}>
            <View style={styles.cardStripe} />
            <Text style={styles.cardCvv}>{cvv || '•••'}</Text>
          </Animated.View>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.formLabel}>Número do Cartão</Text>
          <TextInput
            style={styles.inputField}
            value={cardNumber}
            onChangeText={(text) => setCardNumber(formatCardNumber(text))}
            keyboardType="numeric"
            placeholder="0000 0000 0000 0000"
            maxLength={19}
          />

          <View style={styles.row}>
            <View style={styles.halfInput}>
              <Text style={styles.formLabel}>Validade</Text>
              <TextInput
                style={styles.inputField}
                value={expiry}
                onChangeText={setExpiry}
                placeholder="MM/AA"
                maxLength={5}
              />
            </View>
            <View style={styles.halfInput}>
              <Text style={styles.formLabel}>CVV</Text>
              <TextInput
                style={styles.inputField}
                value={cvv}
                onChangeText={setCvv}
                onFocus={handleFocusCVV}
                onBlur={handleBlurCVV}
                keyboardType="numeric"
                placeholder="123"
                maxLength={4}
              />
            </View>
          </View>

          <TouchableOpacity
            style={styles.primaryButton}
            onPress={handleConfirm}>
            <Text style={styles.buttonText}>Confirmar Pagamento</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}>
            <Text style={styles.backButtonText}>← Voltar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}

// --- Confirmação ---
function OrderConfirmationScreen({ route, navigation }) {
  const { last4 } = route.params || {};

  return (
    <View style={styles.screenContainer}>
      <View style={styles.checkIcon}>
        <Text style={styles.checkmark}>✓</Text>
      </View>
      <Text style={styles.confirmationTitle}>Pedido Confirmado!</Text>
      {last4 && (
        <Text style={styles.confirmationText}>Cartão final {last4}</Text>
      )}
      <Text style={styles.confirmationText}>
        Seu pedido está sendo preparado com carinho ☕
      </Text>

      <TouchableOpacity
        style={styles.primaryButton}
        onPress={() => navigation.navigate('Splash')}>
        <Text style={styles.buttonText}>Novo Pedido</Text>
      </TouchableOpacity>
    </View>
  );
}

// --- App ---
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Carrinho" component={CartScreen} />
        <Stack.Screen name="Pagamento" component={PaymentScreen} />
        <Stack.Screen name="CardPayment" component={CardPaymentScreen} />
        <Stack.Screen
          name="OrderConfirmation"
          component={OrderConfirmationScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// --- Estilos ---
const styles = StyleSheet.create({
  container: { flex: 1 },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: height * 0.12,
  },

  screenContainer: {
    flexGrow: 1,
    backgroundColor: '#aeb879',
    paddingHorizontal: width * 0.06,
    paddingTop: Platform.OS === 'ios' ? height * 0.07 : height * 0.05,
  },
  screenTitle: {
    fontSize: 26 / fontScale,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: height * 0.03,
    color: '#3e2723',
  },

  cartList: { marginBottom: height * 0.03 },
  cartItem: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: width * 0.04,
    marginBottom: height * 0.02,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  itemContent: { flex: 1 },
  itemName: {
    fontSize: 17 / fontScale,
    fontWeight: '700',
    color: '#333',
    marginBottom: 4,
  },
  itemMeta: { fontSize: 14 / fontScale, color: '#666' },
  itemPrice: { fontSize: 19 / fontScale, fontWeight: '800', color: '#3e2723' },

  totalCard: {
    backgroundColor: '#fff',
    padding: width * 0.04,
    borderRadius: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: height * 0.03,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  totalLabel: { fontSize: 18 / fontScale, fontWeight: '600', color: '#333' },
  totalValue: { fontSize: 22 / fontScale, fontWeight: '800', color: '#3e2723' },

  paymentOption: {
    backgroundColor: '#3e2723',
    paddingVertical: height * 0.023,
    borderRadius: 16,
    marginVertical: height * 0.012,
    alignItems: 'center',
    elevation: 4,
  },
  paymentOptionText: {
    color: '#fff',
    fontSize: 18 / fontScale,
    fontWeight: '600',
  },
  backButton: { paddingVertical: 14, alignItems: 'center', marginTop: 20 },
  backButtonText: {
    color: '#444',
    fontSize: 17 / fontScale,
    fontWeight: '600',
  },

  cardVisual: {
    height: height * 0.25,
    marginBottom: height * 0.04,
    alignItems: 'center',
    justifyContent: 'center',
    perspective: 1000,
  },
  cardFaceCommon: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    backfaceVisibility: 'hidden',
    borderRadius: 22,
    padding: width * 0.06,
    justifyContent: 'space-between',
  },
  cardFaceBack: {
    backgroundColor: '#222',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  cardBrand: {
    fontSize: 20 / fontScale,
    fontWeight: '800',
    letterSpacing: 1.5,
  },
  cardNumber: { fontSize: 20 / fontScale, fontWeight: '700', letterSpacing: 3 },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between' },
  cardHolder: { fontSize: 14 / fontScale, letterSpacing: 1 },
  cardExpiry: { fontSize: 18 / fontScale, fontWeight: '600' },
  cardStripe: {
    height: 45,
    backgroundColor: 'rgba(0,0,0,0.85)',
    marginBottom: 16,
    width: '100%',
    borderRadius: 4,
  },
  cardCvv: { color: '#fff', fontSize: 20 / fontScale, fontWeight: '700' },

  formContainer: { width: '100%', maxWidth: 340, alignSelf: 'center' },
  formLabel: {
    fontSize: 15 / fontScale,
    fontWeight: '600',
    color: '#333',
    marginTop: 16,
    marginBottom: 8,
  },
  inputField: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 14,
    fontSize: 16 / fontScale,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  row: { flexDirection: 'row', gap: 16, marginTop: 8 },
  halfInput: { flex: 1 },

  primaryButton: {
    backgroundColor: '#3e2723',
    paddingVertical: height * 0.023,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 24,
    elevation: 5,
  },
  buttonText: { color: '#fff', fontSize: 18 / fontScale, fontWeight: '700' },

  checkIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#e8f5e9',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 24,
  },
  checkmark: { fontSize: 42 / fontScale, color: '#4caf50' },
  confirmationTitle: {
    fontSize: 26 / fontScale,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 16,
    color: '#3e2723',
  },
  confirmationText: {
    fontSize: 17 / fontScale,
    textAlign: 'center',
    marginVertical: 10,
    color: '#333',
    lineHeight: 24,
  },

  footer: {
    textAlign: 'center',
    marginTop: 30,
    color: '#333',
    fontSize: 15 / fontScale,
  },
});
