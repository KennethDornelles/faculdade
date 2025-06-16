import { Module } from '@nestjs/common';
import { AddressController } from './address.controller';
import { ViaCepService } from './viacep.service';

@Module({
  controllers: [AddressController],
  providers: [ViaCepService],
  exports: [ViaCepService],
})
export class AddressModule {}
