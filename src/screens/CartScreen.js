

import React from "react";
import { View, Text, FlatList, Pressable, StyleSheet, Platform, Dimensions } from "react-native"; 
import { useCart } from "../context/CartContext";

const { width, height, fontScale } = Dimensions.get("window");

export default function CartScreen({ navigation }) {
  const { cart, removeFromCart, clearCart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <View style={styles.screenContainer}> 
      <Text style={styles.header}>🛒 Seu Carrinho</Text>

      {cart.length === 0 ? (
        <Text style={styles.empty}>Seu carrinho está vazio.</Text>
      ) : (
        <FlatList
          data={cart}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.cartItem}>
              <View style={styles.itemContent}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemMeta}>
                    {item.quantity}x R$ {item.price.toFixed(2)}
                  </Text>
              </View>
              <Pressable
                style={styles.removeButton}
                onPress={() => removeFromCart(item.id)}
              >
                <Text style={styles.removeText}>Remover</Text>
              </Pressable>
            </View>
          )}
        />
      )}

      {cart.length > 0 && (
        <>
          <View style={styles.totalCard}>
              <Text style={styles.totalLabel}>Total do Pedido</Text>
              <Text style={styles.totalValue}>R$ {total.toFixed(2)}</Text>
          </View>

          {/* 👇 BOTÃO DE FINALIZAR COMPRA (do novo código) */}
          <Pressable style={styles.primaryButton} onPress={() => navigation.navigate("Pagamento")}>
              <Text style={styles.buttonText}>Finalizar Compra</Text>
          </Pressable>

          {/* Botão de Limpar (do seu código antigo, ajustado) */}
          <Pressable style={styles.clearButton} onPress={clearCart}>
            <Text style={styles.clearText}>Limpar Carrinho</Text>
          </Pressable>
        </>
      )}

      <Pressable
        style={styles.backButton}
        onPress={() => navigation.navigate("Menu")}
      >
        <Text style={styles.backButtonText}>← Voltar ao Menu</Text>
      </Pressable>
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
  header: { fontSize: 26 / fontScale, fontWeight: "800", textAlign: "center", marginBottom: height * 0.03, color: "#3e2723" },
  empty: { textAlign: "center", color: "#666", marginTop: 40, fontSize: 16 / fontScale },
  
  // Estilos do Item (combinação)
  cartItem: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: width * 0.04,
    marginBottom: height * 0.02,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  itemContent: { flex: 1 },
  itemName: { fontSize: 17 / fontScale, fontWeight: "700", color: "#333", marginBottom: 4 },
  itemMeta: { fontSize: 14 / fontScale, color: "#666" },
  removeButton: { backgroundColor: "#f0f0f0", paddingVertical: 6, paddingHorizontal: 10, borderRadius: 5, alignSelf: "flex-start" },
  removeText: { color: "#e74c3c", fontWeight: "bold", fontSize: 12 / fontScale },

  // Card de Total (do novo código)
  totalCard: {
    backgroundColor: "#fff",
    padding: width * 0.04,
    borderRadius: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: height * 0.03,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  totalLabel: { fontSize: 18 / fontScale, fontWeight: "600", color: "#333" },
  totalValue: { fontSize: 22 / fontScale, fontWeight: "800", color: "#3e2723" },

  // Botão Primário (do novo código)
  primaryButton: { 
    backgroundColor: "#3e2723", 
    paddingVertical: height * 0.023, 
    borderRadius: 16, 
    alignItems: "center", 
    elevation: 5 
  },
  buttonText: { color: "#fff", fontSize: 18 / fontScale, fontWeight: "700" },

  // Botão Limpar (estilo ajustado)
  clearButton: { 
    backgroundColor: "transparent", 
    padding: 10, 
    borderRadius: 8, 
    alignItems: 'center', 
    marginTop: 10 
  },
  clearText: { color: "#3e2723", fontWeight: "bold" },
  
  // Botão Voltar (estilo ajustado)
  backButton: { paddingVertical: 14, alignItems: "center", marginTop: 10 },
  backButtonText: { color: "#444", fontSize: 17 / fontScale, fontWeight: "600" },
});