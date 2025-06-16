import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ViaCepService } from './viacep.service';

@ApiTags('📍 Endereços')
@Controller('address')
export class AddressController {
  constructor(private readonly viaCepService: ViaCepService) {}

  @Get('cep/:cep')
  @ApiOperation({ summary: 'Buscar endereço por CEP' })
  @ApiResponse({ status: 200, description: 'Endereço encontrado' })
  @ApiResponse({ status: 400, description: 'CEP inválido ou não encontrado' })
  async searchCep(@Param('cep') cep: string) {
    return this.viaCepService.searchCep(cep);
  }
}
