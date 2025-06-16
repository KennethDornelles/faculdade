export interface Produto {
  id: number;
  nome: string;
  preco: string;
  imagem: string;
  descricao: string;
}

export interface CarrinhoItem extends Produto {
  quantidade: number;
}

export interface FormCliente {
  nome: string;
  email: string;
  telefone: string;
  documento: string;
}

export interface FormEndereco {
  cep: string;
  rua: string;
  numero: string;
  complemento?: string;
  bairro: string;
  cidade: string;
  estado: string;
}

export interface Pedido {
  numero: string;
  itens: CarrinhoItem[];
  cliente: FormCliente;
  endereco: FormEndereco;
  metodoPagamento: string;
  total: number;
}
