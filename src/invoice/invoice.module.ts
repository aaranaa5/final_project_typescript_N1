import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { InvoiceController } from './invoice.controller';
import { InvoiceService } from './invoice.services';
import { invoiceProviders } from './invoice.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [InvoiceController],
  providers: [InvoiceService, ...invoiceProviders],
})
export class InvoiceModule {}
