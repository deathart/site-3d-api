import { Injectable } from '@nestjs/common';
import { CreateQuotationDto } from '../shareds/dto/quotation/create-quotation.dto';
import { UpdateQuotationDto } from '../shareds/dto/quotation/update-quotation.dto';

@Injectable()
export class QuotationService {
  create(createQuotationDto: CreateQuotationDto) {
    return 'This action adds a new quotation';
  }

  findAll() {
    return 'This action returns all quotation';
  }

  findOne(id: number) {
    return `This action returns a #${id} quotation`;
  }

  update(id: number, updateQuotationDto: UpdateQuotationDto) {
    return `This action updates a #${id} quotation`;
  }

  remove(id: number) {
    return `This action removes a #${id} quotation`;
  }
}
