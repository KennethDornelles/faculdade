// E-commerce JavaScript com integração MercadoPago
// Dados dos produtos
const produtos = [
    {
        id: 1,
        nome: "Smartphone Pro",
        preco: "R$ 1.299,00",
        imagem: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300",
        descricao: "Smartphone com câmera profissional"
    },
    {
        id: 2,
        nome: "Laptop Gaming",
        preco: "R$ 2.499,00",
        imagem: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300",
        descricao: "Laptop para jogos e trabalho"
    },
    {
        id: 3,
        nome: "Fone Bluetooth",
        preco: "R$ 299,00",
        imagem: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300",
        descricao: "Fone sem fio com cancelamento de ruído"
    },
    {
        id: 4,
        nome: "Smartwatch",
        preco: "R$ 599,00",
        imagem: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300",
        descricao: "Relógio inteligente com GPS"
    },
    {
        id: 5,
        nome: "Tablet Pro",
        preco: "R$ 1.899,00",
        imagem: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=300",
        descricao: "Tablet profissional para criatividade"
    },
    {
        id: 6,
        nome: "Camera DSLR",
        preco: "R$ 3.299,00",
        imagem: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=300",
        descricao: "Câmera profissional para fotografia"
    }
];

// Variáveis globais
let carrinho = [];
let mercadopago = null;

// Elementos DOM
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const produtosGrid = document.getElementById('produtos-grid');
const ctaButton = document.querySelector('.cta-button');

// Inicialização quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    carregarProdutos();
    configurarNavegacao();
    criarModalCarrinho();
    inicializarMercadoPago();
    configurarCEP();
});

// ===== NAVEGAÇÃO =====
function configurarNavegacao() {
    // Toggle do menu mobile
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    // Fechar menu ao clicar em um link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu && navToggle) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    });

    // Scroll suave
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // CTA Button
    if (ctaButton) {
        ctaButton.addEventListener('click', () => {
            const produtosSection = document.getElementById('produtos');
            if (produtosSection) {
                produtosSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    }
}

// ===== PRODUTOS =====
function carregarProdutos() {
    if (!produtosGrid) {
        console.error('Elemento produtos-grid não encontrado');
        return;
    }
    
    // Mostrar indicador de carregamento
    produtosGrid.innerHTML = '<div class="loading">Carregando produtos...</div>';
    
    // Simular um pequeno delay para demonstrar o loading
    setTimeout(() => {
        produtosGrid.innerHTML = '';
        
        produtos.forEach((produto, index) => {
            const produtoCard = document.createElement('div');
            produtoCard.className = 'produto-card';
            produtoCard.style.animationDelay = `${index * 0.1}s`;
            
            produtoCard.innerHTML = `
                <img src="${produto.imagem}" alt="${produto.nome}" loading="lazy">
                <h3>${produto.nome}</h3>
                <p class="descricao">${produto.descricao}</p>
                <p class="preco">${produto.preco}</p>
                <button class="btn-comprar" onclick="adicionarAoCarrinho(${produto.id})">
                    Adicionar ao Carrinho
                </button>
            `;
            
            produtosGrid.appendChild(produtoCard);
        });
    }, 500);
}

// ===== CARRINHO =====
function criarModalCarrinho() {
    // Verificar se já existe
    if (document.querySelector('.carrinho-modal')) {
        return;
    }

    // Criar ícone do carrinho no header
    const navbar = document.querySelector('.nav-container');
    if (navbar && !navbar.querySelector('.carrinho-icon')) {
        const carrinhoIcon = document.createElement('div');
        carrinhoIcon.className = 'carrinho-icon';
        carrinhoIcon.innerHTML = `
            <button onclick="toggleCarrinho()" aria-label="Abrir carrinho">
                🛒 <span class="carrinho-count">0</span>
            </button>
        `;
        navbar.appendChild(carrinhoIcon);
    }

    // Criar modal do carrinho
    const carrinhoModal = document.createElement('div');
    carrinhoModal.className = 'carrinho-modal';
    carrinhoModal.innerHTML = `
        <div class="carrinho-content">
            <div class="carrinho-header">
                <h3>Seu Carrinho</h3>
                <button class="fechar-carrinho" onclick="toggleCarrinho()">×</button>
            </div>
            <div class="carrinho-body">
                <div id="carrinho-items">
                    <p class="carrinho-vazio">Seu carrinho está vazio</p>
                </div>
            </div>
            <div class="carrinho-footer">
                <div class="carrinho-total">
                    <strong>Total: R$ <span id="total-carrinho">0,00</span></strong>
                </div>
                <button class="btn-finalizar" onclick="finalizarCompra()">
                    Finalizar Compra
                </button>
            </div>
        </div>
    `;
    document.body.appendChild(carrinhoModal);

    // Fechar modal ao clicar fora
    carrinhoModal.addEventListener('click', (e) => {
        if (e.target === carrinhoModal) {
            toggleCarrinho();
        }
    });
}

function toggleCarrinho() {
    const modal = document.querySelector('.carrinho-modal');
    if (modal) {
        modal.style.display = modal.style.display === 'flex' ? 'none' : 'flex';
    }
}

function adicionarAoCarrinho(produtoId) {
    const produto = produtos.find(p => p.id === produtoId);
    if (!produto) return;

    const itemExistente = carrinho.find(item => item.id === produtoId);
    
    if (itemExistente) {
        itemExistente.quantidade += 1;
    } else {
        carrinho.push({
            ...produto,
            quantidade: 1
        });
    }
    
    atualizarCarrinho();
    
    // Feedback visual
    mostrarNotificacao(`${produto.nome} adicionado ao carrinho!`);
}

function removerDoCarrinho(produtoId) {
    carrinho = carrinho.filter(item => item.id !== produtoId);
    atualizarCarrinho();
}

function alterarQuantidade(produtoId, delta) {
    const item = carrinho.find(item => item.id === produtoId);
    if (item) {
        item.quantidade += delta;
        if (item.quantidade <= 0) {
            removerDoCarrinho(produtoId);
        } else {
            atualizarCarrinho();
        }
    }
}

function atualizarCarrinho() {
    const countElement = document.querySelector('.carrinho-count');
    const itemsContainer = document.getElementById('carrinho-items');
    const totalElement = document.getElementById('total-carrinho');
    
    // Atualizar contador
    if (countElement) {
        const totalItems = carrinho.reduce((total, item) => total + item.quantidade, 0);
        countElement.textContent = totalItems;
    }
    
    // Atualizar lista de itens
    if (itemsContainer) {
        if (carrinho.length === 0) {
            itemsContainer.innerHTML = '<p class="carrinho-vazio">Seu carrinho está vazio</p>';
        } else {
            itemsContainer.innerHTML = carrinho.map(item => `
                <div class="carrinho-item">
                    <img src="${item.imagem}" alt="${item.nome}">
                    <div class="item-info">
                        <h4>${item.nome}</h4>
                        <p>${item.preco}</p>
                    </div>
                    <div class="item-controls">
                        <button onclick="alterarQuantidade(${item.id}, -1)">-</button>
                        <span>${item.quantidade}</span>
                        <button onclick="alterarQuantidade(${item.id}, 1)">+</button>
                    </div>
                    <button class="remover-item" onclick="removerDoCarrinho(${item.id})">🗑️</button>
                </div>
            `).join('');
        }
    }
    
    // Atualizar total
    if (totalElement) {
        const total = calcularTotal();
        totalElement.textContent = formatarMoeda(total);
    }
}

function calcularTotal() {
    return carrinho.reduce((total, item) => {
        const preco = parseFloat(item.preco.replace('R$ ', '').replace('.', '').replace(',', '.'));
        return total + (preco * item.quantidade);
    }, 0);
}

function formatarMoeda(valor) {
    return valor.toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

// ===== CHECKOUT =====
function finalizarCompra() {
    if (carrinho.length === 0) {
        mostrarNotificacao('Seu carrinho está vazio!', 'error');
        return;
    }
    
    // Esconder seções principais
    document.querySelectorAll('main > section:not(#checkout)').forEach(section => {
        section.style.display = 'none';
    });
    
    // Mostrar checkout
    const checkoutSection = document.getElementById('checkout');
    if (checkoutSection) {
        checkoutSection.classList.remove('hidden');
        checkoutSection.style.display = 'block';
    }
    
    // Fechar modal do carrinho
    toggleCarrinho();
    
    // Carregar dados do checkout
    carregarCheckout();
    
    // Scroll para o topo
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function voltarParaCarrinho() {
    // Esconder checkout
    const checkoutSection = document.getElementById('checkout');
    if (checkoutSection) {
        checkoutSection.style.display = 'none';
    }
    
    // Mostrar seções principais
    document.querySelectorAll('main > section:not(#checkout)').forEach(section => {
        section.style.display = 'block';
    });
    
    // Abrir carrinho
    toggleCarrinho();
}

function carregarCheckout() {
    const checkoutItems = document.getElementById('checkout-items');
    const subtotalElement = document.getElementById('checkout-subtotal');
    const totalElement = document.getElementById('checkout-total');
    
    if (!checkoutItems) return;
    
    // Carregar itens
    checkoutItems.innerHTML = carrinho.map(item => `
        <div class="checkout-item">
            <img src="${item.imagem}" alt="${item.nome}">
            <div class="checkout-item-info">
                <h4>${item.nome}</h4>
                <p>Quantidade: ${item.quantidade}</p>
            </div>
            <div class="checkout-item-price">${item.preco}</div>
        </div>
    `).join('');
    
    // Calcular totais
    const subtotal = calcularTotal();
    const frete = 15.00;
    const total = subtotal + frete;
    
    if (subtotalElement) {
        subtotalElement.textContent = `R$ ${formatarMoeda(subtotal)}`;
    }
    
    if (totalElement) {
        totalElement.textContent = `R$ ${formatarMoeda(total)}`;
    }
    
    // Configurar pagamento
    configurarPagamento(total);
}

// ===== MERCADOPAGO =====
function inicializarMercadoPago() {
    try {
        if (typeof MercadoPago !== 'undefined') {
            // Substitua pela sua chave pública do MercadoPago
            mercadopago = new MercadoPago('TEST-your-public-key-here');
            console.log('MercadoPago inicializado com sucesso');
        } else {
            console.warn('MercadoPago SDK não carregado, usando fallback');
            criarInterfacePagamentoCustomizada();
        }
    } catch (error) {
        console.error('Erro ao inicializar MercadoPago:', error);
        criarInterfacePagamentoCustomizada();
    }
}

function configurarPagamento(total) {
    const checkoutContainer = document.getElementById('mercadopago-checkout');
    if (!checkoutContainer) return;
    
    if (mercadopago) {
        // Configuração real do MercadoPago
        const preference = {
            items: carrinho.map(item => ({
                id: item.id.toString(),
                title: item.nome,
                description: item.descricao,
                picture_url: item.imagem,
                category_id: "electronics",
                quantity: item.quantidade,
                currency_id: "BRL",
                unit_price: parseFloat(item.preco.replace('R$ ', '').replace('.', '').replace(',', '.'))
            })),
            shipments: {
                cost: 15.00,
                mode: "not_specified"
            }
        };
        
        // Aqui você implementaria a criação da preferência via backend
        // Por enquanto, usamos interface customizada
        criarInterfacePagamentoCustomizada();
    } else {
        criarInterfacePagamentoCustomizada();
    }
}

function criarInterfacePagamentoCustomizada() {
    const checkoutContainer = document.getElementById('mercadopago-checkout');
    if (!checkoutContainer) return;
    
    checkoutContainer.innerHTML = `
        <div class="payment-methods">
            <h4>Escolha a forma de pagamento:</h4>
            
            <div class="payment-method" data-method="pix">
                <div class="payment-icon">📱</div>
                <div class="payment-info">
                    <h5>PIX</h5>
                    <p>Aprovação instantânea</p>
                </div>
                <div class="payment-badge">Recomendado</div>
            </div>
            
            <div class="payment-method" data-method="credit">
                <div class="payment-icon">💳</div>
                <div class="payment-info">
                    <h5>Cartão de Crédito</h5>
                    <p>Em até 12x sem juros</p>
                </div>
            </div>
            
            <div class="payment-method" data-method="debit">
                <div class="payment-icon">💳</div>
                <div class="payment-info">
                    <h5>Cartão de Débito</h5>
                    <p>Débito à vista</p>
                </div>
            </div>
            
            <div class="payment-method" data-method="boleto">
                <div class="payment-icon">🧾</div>
                <div class="payment-info">
                    <h5>Boleto Bancário</h5>
                    <p>Vencimento em 3 dias úteis</p>
                </div>
            </div>
            
            <div class="payment-method" data-method="mercadopago">
                <div class="payment-icon">💰</div>
                <div class="payment-info">
                    <h5>Saldo MercadoPago</h5>
                    <p>Use seu saldo disponível</p>
                </div>
            </div>
        </div>
        
        <div id="payment-form-container"></div>
    `;
    
    // Adicionar event listeners para seleção de método
    document.querySelectorAll('.payment-method').forEach(method => {
        method.addEventListener('click', () => {
            // Remover seleção anterior
            document.querySelectorAll('.payment-method').forEach(m => m.classList.remove('selected'));
            
            // Selecionar método atual
            method.classList.add('selected');
            
            // Mostrar formulário específico
            const methodType = method.dataset.method;
            mostrarFormularioPagamento(methodType);
        });
    });
}

function mostrarFormularioPagamento(method) {
    const container = document.getElementById('payment-form-container');
    if (!container) return;
    
    let formHTML = '';
    
    switch (method) {
        case 'pix':
            formHTML = `
                <div class="payment-form">
                    <h5>Pagamento via PIX</h5>
                    <p>Após confirmar o pedido, você receberá o código PIX para pagamento.</p>
                    <div class="pix-info">
                        <p>✓ Aprovação instantânea</p>
                        <p>✓ Sem taxas adicionais</p>
                        <p>✓ Disponível 24h</p>
                    </div>
                </div>
            `;
            break;
            
        case 'credit':
            formHTML = `
                <div class="payment-form">
                    <h5>Dados do Cartão de Crédito</h5>
                    <div class="form-group">
                        <label>Número do Cartão</label>
                        <input type="text" placeholder="0000 0000 0000 0000" maxlength="19">
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label>Validade</label>
                            <input type="text" placeholder="MM/AA" maxlength="5">
                        </div>
                        <div class="form-group">
                            <label>CVV</label>
                            <input type="text" placeholder="000" maxlength="4">
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Nome no Cartão</label>
                        <input type="text" placeholder="Nome como no cartão">
                    </div>
                    <div class="form-group">
                        <label>Parcelas</label>
                        <select>
                            <option>1x sem juros</option>
                            <option>2x sem juros</option>
                            <option>3x sem juros</option>
                            <option>6x sem juros</option>
                            <option>12x sem juros</option>
                        </select>
                    </div>
                </div>
            `;
            break;
            
        case 'debit':
            formHTML = `
                <div class="payment-form">
                    <h5>Dados do Cartão de Débito</h5>
                    <div class="form-group">
                        <label>Número do Cartão</label>
                        <input type="text" placeholder="0000 0000 0000 0000" maxlength="19">
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label>Validade</label>
                            <input type="text" placeholder="MM/AA" maxlength="5">
                        </div>
                        <div class="form-group">
                            <label>CVV</label>
                            <input type="text" placeholder="000" maxlength="4">
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Nome no Cartão</label>
                        <input type="text" placeholder="Nome como no cartão">
                    </div>
                </div>
            `;
            break;
            
        case 'boleto':
            formHTML = `
                <div class="payment-form">
                    <h5>Pagamento via Boleto</h5>
                    <p>Após confirmar o pedido, você receberá o boleto para pagamento.</p>
                    <div class="boleto-info">
                        <p>✓ Vencimento em 3 dias úteis</p>
                        <p>✓ Sem taxas adicionais</p>
                        <p>✓ Pague em qualquer banco</p>
                    </div>
                </div>
            `;
            break;
            
        case 'mercadopago':
            formHTML = `
                <div class="payment-form">
                    <h5>Saldo MercadoPago</h5>
                    <p>Use seu saldo disponível na conta MercadoPago.</p>
                    <div class="mercadopago-info">
                        <p>✓ Pagamento instantâneo</p>
                        <p>✓ Sem taxas adicionais</p>
                        <p>✓ Seguro e confiável</p>
                    </div>
                </div>
            `;
            break;
    }
    
    container.innerHTML = formHTML;
}

function processarPagamento() {
    const selectedMethod = document.querySelector('.payment-method.selected');
    
    if (!selectedMethod) {
        mostrarNotificacao('Selecione uma forma de pagamento', 'error');
        return;
    }
    
    // Validar formulários
    if (!validarFormularios()) {
        return;
    }
    
    const method = selectedMethod.dataset.method;
    
    // Simular processamento de pagamento
    mostrarNotificacao('Processando pagamento...', 'info');
    
    setTimeout(() => {
        finalizarPedido(method);
    }, 2000);
}

function validarFormularios() {
    const customerForm = document.getElementById('customer-form');
    const addressForm = document.getElementById('address-form');
    
    // Validar formulário do cliente
    const requiredFields = customerForm.querySelectorAll('[required]');
    for (let field of requiredFields) {
        if (!field.value.trim()) {
            field.focus();
            mostrarNotificacao('Preencha todos os campos obrigatórios', 'error');
            return false;
        }
    }
    
    // Validar formulário de endereço
    const addressFields = addressForm.querySelectorAll('[required]');
    for (let field of addressFields) {
        if (!field.value.trim()) {
            field.focus();
            mostrarNotificacao('Preencha todos os campos de endereço', 'error');
            return false;
        }
    }
    
    return true;
}

function finalizarPedido(paymentMethod) {
    // Simular finalização do pedido
    const orderNumber = Math.floor(Math.random() * 1000000);
    
    // Limpar carrinho
    carrinho = [];
    atualizarCarrinho();
    
    // Mostrar tela de sucesso
    mostrarTelaSuccesso(orderNumber, paymentMethod);
}

function mostrarTelaSuccesso(orderNumber, paymentMethod) {
    const checkoutSection = document.getElementById('checkout');
    if (!checkoutSection) return;
    
    let paymentInfo = '';
    
    switch (paymentMethod) {
        case 'pix':
            paymentInfo = `
                <div class="payment-success-info">
                    <h4>Código PIX gerado!</h4>
                    <p>Use o código abaixo para realizar o pagamento:</p>
                    <div class="pix-code">
                        <code>00020126580014BR.GOV.BCB.PIX0136${orderNumber}520400005303986540515.005802BR5925E-Shop6009SAO PAULO62070503***6304</code>
                    </div>
                    <p>Ou escaneie o QR Code no seu app do banco</p>
                </div>
            `;
            break;
        case 'boleto':
            paymentInfo = `
                <div class="payment-success-info">
                    <h4>Boleto gerado!</h4>
                    <p>Seu boleto foi gerado com sucesso.</p>
                    <p>Código de barras: <strong>03399.65897 12345.678901 23456.789012 3 ${orderNumber}</strong></p>
                    <p>Vencimento: 3 dias úteis</p>
                </div>
            `;
            break;
        default:
            paymentInfo = `
                <div class="payment-success-info">
                    <h4>Pagamento aprovado!</h4>
                    <p>Sua compra foi processada com sucesso.</p>
                </div>
            `;
    }
    
    checkoutSection.innerHTML = `
        <div class="container">
            <div class="success-container">
                <div class="success-icon">✅</div>
                <h2>Pedido Realizado com Sucesso!</h2>
                <p>Número do pedido: <strong>#${orderNumber}</strong></p>
                
                ${paymentInfo}
                
                <div class="success-actions">
                    <button class="btn-primary" onclick="voltarParaInicio()">
                        Continuar Comprando
                    </button>
                </div>
            </div>
        </div>
    `;
}

function voltarParaInicio() {
    // Esconder checkout
    const checkoutSection = document.getElementById('checkout');
    if (checkoutSection) {
        checkoutSection.style.display = 'none';
    }
    
    // Mostrar seções principais
    document.querySelectorAll('main > section:not(#checkout)').forEach(section => {
        section.style.display = 'block';
    });
    
    // Scroll para o topo
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ===== CEP E ENDEREÇO =====
function configurarCEP() {
    const cepInput = document.getElementById('cep');
    if (cepInput) {
        cepInput.addEventListener('blur', buscarCEP);
        cepInput.addEventListener('input', (e) => {
            // Formatar CEP
            let value = e.target.value.replace(/\D/g, '');
            if (value.length <= 8) {
                value = value.replace(/(\d{5})(\d)/, '$1-$2');
                e.target.value = value;
            }
        });
    }
}

function buscarCEP() {
    const cepInput = document.getElementById('cep');
    const cep = cepInput.value.replace(/\D/g, '');
    
    if (cep.length !== 8) return;
    
    // Limpar campos
    document.getElementById('street').value = '';
    document.getElementById('neighborhood').value = '';
    document.getElementById('city').value = '';
    document.getElementById('state').value = '';
    
    // Buscar CEP
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(response => response.json())
        .then(data => {
            if (!data.erro) {
                document.getElementById('street').value = data.logradouro;
                document.getElementById('neighborhood').value = data.bairro;
                document.getElementById('city').value = data.localidade;
                document.getElementById('state').value = data.uf;
            } else {
                mostrarNotificacao('CEP não encontrado', 'error');
            }
        })
        .catch(error => {
            console.error('Erro ao buscar CEP:', error);
            mostrarNotificacao('Erro ao buscar CEP', 'error');
        });
}

// ===== NOTIFICAÇÕES =====
function mostrarNotificacao(mensagem, tipo = 'success') {
    // Remover notificação existente
    const notificacaoExistente = document.querySelector('.notificacao');
    if (notificacaoExistente) {
        notificacaoExistente.remove();
    }
    
    // Criar nova notificação
    const notificacao = document.createElement('div');
    notificacao.className = `notificacao notificacao-${tipo}`;
    notificacao.textContent = mensagem;
    
    document.body.appendChild(notificacao);
    
    // Mostrar notificação
    setTimeout(() => {
        notificacao.classList.add('show');
    }, 100);
    
    // Remover notificação após 3 segundos
    setTimeout(() => {
        notificacao.classList.remove('show');
        setTimeout(() => {
            notificacao.remove();
        }, 300);
    }, 3000);
}

// ===== UTILITÁRIOS =====
function formatarCartao(input) {
    let value = input.value.replace(/\D/g, '');
    value = value.replace(/(\d{4})(?=\d)/g, '$1 ');
    input.value = value;
}

function formatarCPF(input) {
    let value = input.value.replace(/\D/g, '');
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    input.value = value;
}

function formatarTelefone(input) {
    let value = input.value.replace(/\D/g, '');
    value = value.replace(/(\d{2})(\d)/, '($1) $2');
    value = value.replace(/(\d{5})(\d)/, '$1-$2');
    input.value = value;
}

// Aplicar formatação aos campos quando existirem
document.addEventListener('DOMContentLoaded', function() {
    const cpfInput = document.getElementById('customer-document');
    if (cpfInput) {
        cpfInput.addEventListener('input', () => formatarCPF(cpfInput));
    }
    
    const phoneInput = document.getElementById('customer-phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', () => formatarTelefone(phoneInput));
    }
});