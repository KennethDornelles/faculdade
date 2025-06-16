import { Injectable, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

export interface ViaCepResponse {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
  erro?: boolean;
}

@Injectable()
export class ViaCepService {
  private readonly viaCepUrl: string;

  constructor(private configService: ConfigService) {
    this.viaCepUrl = this.configService.get('app.viaCepUrl');
  }

  async searchCep(cep: string): Promise<ViaCepResponse> {
    // Remove caracteres não numéricos
    const cleanCep = cep.replace(/\D/g, '');

    // Valida formato do CEP
    if (cleanCep.length !== 8) {
      throw new BadRequestException('CEP deve conter 8 dígitos');
    }

    try {
      const response = await axios.get<ViaCepResponse>(
        `${this.viaCepUrl}/${cleanCep}/json/`,
      );

      if (response.data.erro) {
        throw new BadRequestException('CEP não encontrado');
      }

      return response.data;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException('Erro ao buscar CEP');
    }
  }
}
