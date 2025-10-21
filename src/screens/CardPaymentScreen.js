import React, { useState, useRef } from 'react';
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
  KeyboardAvoidingView,
} from 'react-native';
import { useCart } from '../context/CartContext';

const { width, height, fontScale } = Dimensions.get('window');

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


export default function CardPaymentScreen({ navigation }) {
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const flipAnim = useRef(new Animated.Value(0)).current;

  const { clearCart } = useCart();

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
    clearCart();
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
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.keyboardAvoidingContainer}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        {/* 3. Adicione o 'keyboardShouldPersistTaps' */}
        <ScrollView
          contentContainerStyle={styles.screenContainer}
          keyboardShouldPersistTaps="always"
        >
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
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  // 4. Adicione este novo estilo
  keyboardAvoidingContainer: {
    flex: 1,
    backgroundColor: '#aeb879',
  },

  screenContainer: {
    flexGrow: 1,
    backgroundColor: '#aeb879',
    paddingHorizontal: width * 0.06,
    paddingTop: Platform.OS === 'ios' ? height * 0.07 : height * 0.05,
  },
  // ... (todos os seus outros estilos)
  screenTitle: {
    fontSize: 26 / fontScale,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: height * 0.03,
    color: '#3e2723',
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
});