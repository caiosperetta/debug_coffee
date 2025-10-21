import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
  Dimensions,
} from "react-native";
import { useCart } from "../context/CartContext"; 

const { width, height, fontScale } = Dimensions.get("window");

export default function OrderConfirmationScreen({ route, navigation }) {
  const { last4 } = route.params || {};
  const { clearCart } = useCart(); 

  const handleNewOrder = () => {
    clearCart(); 
    navigation.navigate("Menu");
  };

  return (
    <View style={styles.screenContainer}>
      <View style={styles.checkIcon}>
        <Text style={styles.checkmark}>✓</Text>
      </View>
      <Text style={styles.confirmationTitle}>Pedido Confirmado!</Text>
      {last4 && <Text style={styles.confirmationText}>Cartão final {last4}</Text>}
      <Text style={styles.confirmationText}>Seu pedido está sendo preparado com carinho ☕</Text>

      <TouchableOpacity style={styles.primaryButton} onPress={handleNewOrder}>
        <Text style={styles.buttonText}>Novo Pedido</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flexGrow: 1,
    backgroundColor: "#aeb879",
    paddingHorizontal: width * 0.06,
    paddingTop: Platform.OS === "ios" ? height * 0.07 : height * 0.05,
    justifyContent: 'center', // Adicionei para centralizar
  },
  primaryButton: { backgroundColor: "#3e2723", paddingVertical: height * 0.023, borderRadius: 16, alignItems: "center", marginTop: 24, elevation: 5 },
  buttonText: { color: "#fff", fontSize: 18 / fontScale, fontWeight: "700" },
  checkIcon: { width: 80, height: 80, borderRadius: 40, backgroundColor: "#e8f5e9", justifyContent: "center", alignItems: "center", alignSelf: "center", marginBottom: 24 },
  checkmark: { fontSize: 42 / fontScale, color: "#4caf50" },
  confirmationTitle: { fontSize: 26 / fontScale, fontWeight: "800", textAlign: "center", marginBottom: 16, color: "#3e2723" },
  confirmationText: { fontSize: 17 / fontScale, textAlign: "center", marginVertical: 10, color: "#333", lineHeight: 24 },
});