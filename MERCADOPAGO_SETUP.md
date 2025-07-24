# Configuração do MercadoPago

## 🚀 Como configurar o MercadoPago

### 1. Criar conta no MercadoPago
1. Acesse [MercadoPago Developers](https://www.mercadopago.com.br/developers)
2. Crie sua conta ou faça login
3. Acesse "Suas integrações" > "Criar aplicação"

### 2. Obter credenciais
1. No painel do desenvolvedor, vá em "Credenciais"
2. Copie a **Chave Pública** de teste
3. No arquivo `script.js`, substitua:
   ```javascript
   const MP_PUBLIC_KEY = 'TEST-your-public-key-here';
   ```
   Por:
   ```javascript
   const MP_PUBLIC_KEY = 'sua-chave-publica-aqui';
   ```

### 3. Configurar Webhook (opcional)
Para receber notificações de pagamento:
1. Configure uma URL de webhook no painel
2. Implemente um endpoint para processar as notificações

### 4. Métodos de Pagamento Disponíveis
- 💳 Cartão de Crédito/Débito
- 🏦 PIX
- 🎫 Boleto Bancário
- 💰 Saldo em conta MercadoPago

### 5. Funcionalidades Implementadas
- ✅ Checkout transparente
- ✅ Múltiplos métodos de pagamento
- ✅ Validação de formulários
- ✅ Integração com carrinho
- ✅ Busca de CEP automática
- ✅ Tela de sucesso
- ✅ Responsividade mobile

### 6. Para Produção
1. Obtenha as credenciais de produção
2. Substitua `TEST-` por `APP_USR-` na chave
3. Configure SSL (HTTPS)
4. Teste todos os fluxos de pagamento

### 7. Documentação Oficial
- [Documentação MercadoPago](https://www.mercadopago.com.br/developers/pt/docs)
- [Checkout Pro](https://www.mercadopago.com.br/developers/pt/docs/checkout-pro/landing)
- [Web Tokenize Checkout](https://www.mercadopago.com.br/developers/pt/docs/checkout-api/landing)

## 🔧 Personalização

### Adicionar novos campos
Edite os formulários em `index.html` e atualize a validação em `script.js`

### Personalizar estilos
Modifique as classes CSS em `styles.css` na seção "Estilos do Checkout"

### Integrar com backend
Implemente endpoints para:
- Criar preferência de pagamento
- Processar webhooks
- Salvar pedidos no banco de dados
