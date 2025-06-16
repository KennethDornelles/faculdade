# E-commerce dos Guri - Frontend Angular

Este é um projeto de e-commerce moderno construído com Angular 19, baseado no projeto original do repositório `kennethdornelles/faculdade`.

## 🚀 Funcionalidades

- **Catálogo de Produtos**: Exibição de produtos com imagens, preços e descrições
- **Carrinho de Compras**: Adicionar/remover produtos, controle de quantidade
- **Checkout Completo**: Formulários para dados do cliente e endereço
- **Integração CEP**: Busca automática de endereço via ViaCEP
- **Múltiplas Formas de Pagamento**: PIX, Cartão de Crédito/Débito, Boleto
- **Design Responsivo**: Funciona perfeitamente em desktop e mobile
- **Notificações**: Sistema de feedback visual para o usuário

## 🛠️ Tecnologias Utilizadas

- **Angular 19**: Framework principal
- **TypeScript**: Linguagem de programação
- **SCSS**: Pré-processador CSS
- **RxJS**: Programação reativa
- **Angular Reactive Forms**: Formulários reativos
- **HttpClient**: Cliente HTTP para API calls

## 📁 Estrutura do Projeto

```
src/
├── app/
│   ├── components/          # Componentes da aplicação
│   │   ├── header/         # Cabeçalho e carrinho
│   │   ├── hero/           # Seção principal
│   │   ├── produtos/       # Lista de produtos
│   │   ├── checkout/       # Processo de compra
│   │   ├── sobre/          # Seção sobre
│   │   └── footer/         # Rodapé
│   ├── services/           # Serviços da aplicação
│   │   ├── produto.service.ts      # Gerenciamento de produtos
│   │   ├── carrinho.service.ts     # Gerenciamento do carrinho
│   │   ├── cep.service.ts          # Integração ViaCEP
│   │   └── notificacao.service.ts  # Sistema de notificações
│   └── models/             # Interfaces e tipos
│       └── produto.model.ts
```

## 🚦 Como Executar

1. **Pré-requisitos**:
   - Node.js 18+ instalado
   - Angular CLI instalado globalmente

2. **Instalação**:
   ```bash
   cd frontend
   npm install
   ```

3. **Desenvolvimento**:
   ```bash
   npm start
   # ou
   ng serve
   ```

4. **Build para Produção**:
   ```bash
   npm run build
   # ou
   ng build
   ```

## 🎨 Design e UX

O projeto segue as melhores práticas de design moderno:

- **Design System**: Variáveis CSS consistentes
- **Animações**: Transições suaves e animações de carregamento
- **Responsividade**: Layout que se adapta a diferentes tamanhos de tela
- **Acessibilidade**: Atributos ARIA e navegação por teclado
- **Performance**: Lazy loading de imagens e otimizações

## 🛒 Fluxo de Compra

1. **Navegação**: O usuário visualiza os produtos na página inicial
2. **Carrinho**: Adiciona produtos ao carrinho via botão
3. **Revisão**: Visualiza itens no modal do carrinho
4. **Checkout**: Preenche dados pessoais e de entrega
5. **Pagamento**: Escolhe forma de pagamento
6. **Confirmação**: Recebe confirmação do pedido

## 🔧 Funcionalidades Técnicas

### Gerenciamento de Estado
- Uso de BehaviorSubject para estado reativo do carrinho
- LocalStorage para persistência do carrinho
- Observables para comunicação entre componentes

### Validação de Formulários
- Validações em tempo real nos formulários
- Formatação automática de CPF, telefone e CEP
- Feedback visual de erros

### Integração de APIs
- ViaCEP para busca automática de endereços
- Estrutura preparada para integração com APIs de pagamento

## 📱 Responsividade

O projeto é totalmente responsivo com breakpoints em:
- Desktop: 1200px+
- Tablet: 768px - 1199px  
- Mobile: até 767px

## 🚀 Próximos Passos

- [ ] Integração real com APIs de pagamento
- [ ] Sistema de autenticação de usuários
- [ ] Painel administrativo
- [ ] Sistema de avaliações de produtos
- [ ] Funcionalidade de busca e filtros
- [ ] Integração com backend real

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

---

Desenvolvido com ❤️ usando Angular e TypeScript
