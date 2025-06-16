# 🚀 E-commerce Backend - NestJS API

Backend completo para e-commerce desenvolvido com **NestJS**, **Prisma** e **PostgreSQL**, totalmente alinhado com o frontend Angular.

## 🏗️ **Arquitetura**

### **Stack Tecnológica**
- **NestJS** - Framework Node.js modular e escalável
- **Prisma** - ORM moderno com type-safety
- **PostgreSQL** - Banco de dados relacional
- **JWT** - Autenticação baseada em tokens
- **Swagger** - Documentação automática da API
- **TypeScript** - Linguagem tipada

### **Estrutura de Módulos**
```
src/
├── auth/                 # 🔐 Autenticação e autorização
│   ├── dto/             # Data Transfer Objects
│   ├── guards/          # Guards de segurança
│   ├── strategies/      # Estratégias Passport
│   └── decorators/      # Decorators customizados
├── products/            # 🛍️ Gerenciamento de produtos
├── cart/                # 🛒 Carrinho de compras
├── address/             # 📍 Integração ViaCEP
├── prisma/              # 🗄️ Cliente Prisma
└── config/              # ⚙️ Configurações
```

## 🚦 **Como Executar**

### **1. Instalação**
```bash
npm install
```

### **2. Configurar Banco**
```bash
# Gerar client Prisma
npm run prisma:generate

# Executar migrations
npm run prisma:migrate

# Popular com dados iniciais
npm run prisma:seed
```

### **3. Executar**
```bash
# Desenvolvimento
npm run start:dev

# Acesse: http://localhost:3000
# Docs: http://localhost:3000/api/docs
```

## 📚 **API Endpoints**

### **🔐 Autenticação**
- `POST /auth/register` - Registrar usuário
- `POST /auth/login` - Login

### **🛍️ Produtos**
- `GET /products` - Listar produtos
- `GET /products/search?q=termo` - Buscar
- `POST /products` - Criar (Admin)

### **🛒 Carrinho**
- `GET /cart` - Ver carrinho
- `POST /cart/add` - Adicionar item
- `DELETE /cart/clear` - Limpar

### **📍 Endereços**
- `GET /address/cep/:cep` - Buscar CEP

## 🧪 **Dados de Teste**

```bash
# Admin
Email: admin@ecommerce.com
Senha: admin123

# Cliente
Email: cliente@email.com  
Senha: user123
```

## 📖 **Documentação**

Acesse: `http://localhost:3000/api/docs` para a documentação interativa Swagger.

---

**🎯 Backend 100% funcional e alinhado com o frontend Angular!**
