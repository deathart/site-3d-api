import { Injectable } from '@nestjs/common';
import { CreateContactDto } from '../shareds/dto/contact/create-contact.dto';
import { UpdateContactDto } from '../shareds/dto/contact/update-contact.dto';

@Injectable()
export class ContactService {
  create(createContactDto: CreateContactDto) {
    return 'This action adds a new contact';
  }

  findAll() {
    return 'This action returns all contact';
  }

  findOne(id: number) {
    return `This action returns a #${id} contact`;
  }

  update(id: number, updateContactDto: UpdateContactDto) {
    return `This action updates a #${id} contact`;
  }

  remove(id: number) {
    return `This action removes a #${id} contact`;
  }
}
