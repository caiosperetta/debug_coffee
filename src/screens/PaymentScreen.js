import React, { useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Animated,
  Platform,
  Dimensions,
} from "react-native";

const { width, height, fontScale } = Dimensions.get("window");

export default function PaymentScreen({ navigation }) {
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

        <TouchableOpacity style={styles.paymentOption} onPress={() => navigation.navigate("CardPayment")}>
          <Text style={styles.paymentOptionText}>💳 Cartão de Crédito</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.paymentOption}
          onPress={() => Alert.alert("✅ Pix!", "Pagamento via Pix confirmado com sucesso!")}
        >
          <Text style={styles.paymentOptionText}>📱 Pix</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.paymentOption}
          onPress={() => Alert.alert("✅ Dinheiro!", "Pagamento em dinheiro confirmado!")}
        >
          <Text style={styles.paymentOptionText}>💵 Dinheiro</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>← Voltar ao Carrinho</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flexGrow: 1,
    backgroundColor: "#aeb879",
    paddingHorizontal: width * 0.06,
    paddingTop: Platform.OS === "ios" ? height * 0.07 : height * 0.05,
  },
  screenTitle: { fontSize: 26 / fontScale, fontWeight: "800", textAlign: "center", marginBottom: height * 0.03, color: "#3e2723" },
  paymentOption: { backgroundColor: "#3e2723", paddingVertical: height * 0.023, borderRadius: 16, marginVertical: height * 0.012, alignItems: "center", elevation: 4 },
  paymentOptionText: { color: "#fff", fontSize: 18 / fontScale, fontWeight: "600" },
  backButton: { paddingVertical: 14, alignItems: "center", marginTop: 20 },
  backButtonText: { color: "#444", fontSize: 17 / fontScale, fontWeight: "600" },
});