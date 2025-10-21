# ☕ Debug Coffee App ☕

## 🌟 Um Aplicativo Completo de Cafeteria em React Native & Expo 🌟

> Um aplicativo completo de e-commerce para uma cafeteria, desenvolvido do zero com React Native e Expo.
>
> Este projeto simula uma experiência de usuário *completa*, desde a visualização do cardápio até um fluxo de pagamento 100% funcional com animações avançadas.

<br>

## 🚀 Teste Agora Mesmo! (Expo Go)

Este projeto foi desenvolvido no **Expo Snack** e pode ser executado instantaneamente no seu celular (Android ou iOS) sem nenhuma instalação.

### Passo a Passo

1.  Baixe o aplicativo **"Expo Go"** na [App Store](https://apps.apple.com/br/app/expo-go/id982107779) ou [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent).
2.  Abra o app Expo Go.
3.  Toque em "Escanear QR Code" e aponte para a imagem abaixo:

![QR Code do Projeto](image_05617.png)

*(Se a imagem não carregar no GitHub, certifique-se de que o arquivo `image_05617d.png` foi enviado para o repositório).*

<br>

## 🛠️ Tecnologias Utilizadas

* ⚛️ **React Native**
* 🍿 **Expo (Snack)**
* 🗺️ **React Navigation** (Stack)
* 🛒 **React Context API** (Gerenciamento de Estado Global)
* 🎞️ **React Native Reanimated** (Animações)
* 📹 `expo-av` (Player de Vídeo)
* 💳 `expo-payments` (simulação de pagamento)

<br>

## 📋 Funcionalidades Principais

### 🎥 Splash Screen
* **Tela de Abertura Imersiva:** Utiliza `expo-av` para reproduzir um vídeo da marca em tela cheia (hospedado no Cloudinary).
* **Botão Dinâmico:** Um botão "Iniciar" aparece com uma animação de *fade-in* assim que o vídeo termina.

### 💳 Fluxo de Pagamento Completo
* **Seleção de Pagamento:** O usuário escolhe entre Cartão de Crédito, Pix ou Dinheiro.
* **Cartão 3D Animado:** Uma tela de formulário com um cartão que **vira em 3D** (`flip`) quando o usuário foca no campo CVV.
* **Detecção de Bandeira:** O cartão **muda de cor e marca** (Visa, Mastercard, etc.) em tempo real, conforme o usuário digita.
* **Confirmação:** Tela final de "Pedido Confirmado" que limpa o carrinho e permite um novo pedido.

### 🛒 Carrinho de Compras (Context API)
* **Gerenciamento Global:** O estado do carrinho é gerenciado globalmente usando a `Context API` do React.
* **Feedback Visual:** Animação do item "voando" para o carrinho no momento da adição.
* **Contador (Badge):** Ícone do carrinho na tela de Menu possui um "badge" que atualiza em tempo real a quantidade de itens.

### 📱 Navegação e UX
* **Fluxo Completo:** Navegação em Stack: `Splash` ➔ `Login` ➔ `Menu` ➔ `Carrinho` ➔ `Pagamento`.
* **Ícones Personalizados:** Ícone de Perfil com a imagem da marca e ícones flutuantes estilizados.
* **Formulários Inteligentes:** O teclado é gerenciado com `KeyboardAvoidingView` e `keyboardShouldPersistTaps` para uma digitação fluida.

---
