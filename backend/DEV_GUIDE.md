# 🚀 E-commerce Backend - Modo Desenvolvimento

## 🎯 Quick Start (Sem Banco de Dados)

Este backend pode ser executado em modo de desenvolvimento usando dados mock, sem necessidade de configurar banco de dados.

### ⚡ Execução Rápida

```bash
# 1. Instalar dependências
npm install

# 2. Copiar arquivo de ambiente
cp .env.example .env

# 3. Executar em modo desenvolvimento
npm run start:dev
```

### 🌐 Endpoints Disponíveis

**Base URL:** `http://localhost:3001`

#### 🔧 Sistema
- `GET /health` - Health check da API
- `GET /health/info` - Informações da API

#### 🛍️ Produtos (Dados Mock)
- `GET /products` - Listar todos os produtos
- `GET /products/:id` - Buscar produto por ID
- `GET /products/search?q=termo` - Buscar produtos
- `GET /products/category/:category` - Produtos por categoria

#### 📍 Endereços
- `GET /address/cep/:cep` - Buscar endereço por CEP (ViaCEP)

#### 📚 Documentação
- `GET /api` - Swagger/OpenAPI Documentation

### 🛒 Produtos Mock Disponíveis

1. **Smartphone Pro Max** - R$ 2.999,99
2. **Notebook Gamer Ultra** - R$ 4.599,99
3. **Headset Wireless Premium** - R$ 899,99
4. **Monitor 4K Ultrawide** - R$ 1.899,99
5. **Smartwatch Fitness** - R$ 799,99
6. **Câmera DSLR Profissional** - R$ 3.299,99

### 🔄 Testando a API

```bash
# Health Check
curl http://localhost:3001/health

# Listar produtos
curl http://localhost:3001/products

# Buscar produto específico
curl http://localhost:3001/products/1

# Buscar produtos por categoria
curl http://localhost:3001/products/category/Eletrônicos

# Buscar CEP
curl http://localhost:3001/address/cep/01310-100
```

### 📋 Status dos Módulos

#### ✅ Funcionando (Sem Banco)
- [x] Health Check
- [x] Produtos (Mock Data)
- [x] Busca de CEP (ViaCEP)
- [x] Documentação Swagger
- [x] CORS configurado

#### 🔄 Aguardando Banco de Dados
- [ ] Autenticação/Registro
- [ ] Carrinho de Compras
- [ ] Pedidos
- [ ] Usuários

### 🎨 Swagger UI

Acesse `http://localhost:3001/api` para ver a documentação interativa com:
- 🔐 Autenticação
- 🛍️ Produtos
- 🛒 Carrinho
- 📍 Endereços
- 🔧 Sistema

### 📝 Próximos Passos

1. **Configurar Banco PostgreSQL**
2. **Executar Migrations Prisma**
3. **Configurar Seeds**
4. **Testar Autenticação**
5. **Integrar com Frontend**

### 🔧 Scripts Disponíveis

```bash
npm run start:dev    # Desenvolvimento com hot-reload
npm run start:debug  # Debug mode
npm run build        # Build para produção
npm run format       # Formatar código
npm run lint         # Verificar código
```

---

**Status:** ✅ Pronto para desenvolvimento sem banco
**Frontend:** Pronto para conectar em `http://localhost:3001`
