Debug Coffee (App de Cafeteria) ☕
Um aplicativo completo de cafeteria e e-commerce desenvolvido em React Native e Expo. O projeto simula uma experiência completa de pedido, desde a visualização do cardápio até o checkout com pagamento por cartão de crédito animado.

✨ Visão Geral
Este aplicativo foi criado como um projeto de estudo para dominar conceitos-chave do desenvolvimento mobile, incluindo navegação em stack, gerenciamento de estado global com Context API e integração de animações complexas para uma melhor experiência do usuário (UX).

## 🚀 Tecnologias Utilizadas

React Native

Expo (Snack)

React Navigation (para navegação em stack)

React Context API (para gerenciamento do carrinho de compras)

React Native Reanimated (para animações avançadas)

expo-av (para a tela de splash com vídeo)

📋 Funcionalidades Principais
O aplicativo conta com um fluxo de usuário completo, dividido nas seguintes telas:

1. Splash Screen
Uma tela de abertura imersiva que utiliza expo-av para reproduzir um vídeo (logo) em tela cheia.

Ao final do vídeo, um botão "Iniciar" aparece com uma animação de fade-in.

2. Autenticação
Tela de Login simples (ponto de partida para futuras implementações de autenticação real).

3. Cardápio (Menu Screen)
Exibição dos produtos da cafeteria (cafés, doces, etc.) em cards estilizados.

Feedback Visual: Ao clicar em "Adicionar", o usuário vê uma animação do item "voando" em direção ao ícone do carrinho.

Ícones Flutuantes:

Ícone de Perfil: Personalizado com a imagem da marca.

Ícone de Carrinho: Possui um "badge" (contador) que atualiza em tempo real a quantidade de itens no carrinho.

4. Gerenciamento de Carrinho (CartContext)
O estado do carrinho é gerenciado globalmente usando a Context API do React.

Funções disponíveis: addToCart, removeFromCart, clearCart.

O totalItemsInCart é calculado e disponibilizado para o contador (badge).

5. Tela do Carrinho (Cart Screen)
Lista todos os itens adicionados, suas quantidades e preços.

Calcula e exibe o Total do Pedido.

Permite ao usuário remover itens ou limpar o carrinho completamente.

Botão "Finalizar Compra" que inicia o fluxo de pagamento.

6. Fluxo de Pagamento (Checkout)
O checkout é dividido em 3 etapas:

Seleção de Pagamento: O usuário escolhe entre Cartão de Crédito, Pix ou Dinheiro.

Pagamento com Cartão:

Uma tela de formulário com uma animação de cartão 3D que "vira" (flip) quando o usuário foca no campo CVV.

Detecção de Bandeira: O cartão muda de cor e exibe a marca (Visa, Mastercard, etc.) automaticamente conforme o usuário digita o número.

Formatação de inputs (número do cartão, validade).

Integração com o KeyboardAvoidingView para garantir que o teclado não cubra os campos.

Confirmação de Pedido:

Tela final que exibe um "check" de sucesso.

Limpa o carrinho (clearCart()) e oferece um botão para "Fazer Novo Pedido", que navega de volta ao Menu.

⚙️ Como Executar
Este projeto foi desenvolvido utilizando o Expo Snack, o que permite que ele seja executado diretamente no navegador ou no aplicativo Expo Go (Android/iOS) sem necessidade de instalação local.

Acesse o link do Snack: [<img width="264" height="264" alt="image" src="https://github.com/user-attachments/assets/b5979a88-0baf-45cd-9b4d-f56a270091c8" />
]

No seu celular, abra o app Expo Go.

Escaneie o QR Code exibido no Snack.
