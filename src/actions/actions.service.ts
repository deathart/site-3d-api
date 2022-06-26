import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

import { Actions } from '../shareds/interfaces/actions.interface';
import { CreateActionDto } from '../shareds/dto/actions/create.dto';
import { UpdateActionDto } from '../shareds/dto/actions/update.dto';

@Injectable()
export class ActionsService {
  constructor(@Inject('ActionsModelToken') private readonly actionModel: Model<Actions>) {}

  async findById(id: string): Promise<Actions> {
    return await this.actionModel.findById(id).exec();
  }

  async findByBank(bankId: string): Promise<Actions[]> {
    return await this.actionModel.find({bankId}).exec();
  }

  async findByType(bankId: string, type: number): Promise<Actions[]> {
    return await this.actionModel.find({bankId: bankId, type: type}).exec();
  }

  async findByDate(bankId: string, date: Date): Promise<Actions[]> {
    return await this.actionModel.find({bankId: bankId, date: date}).exec();
  }

  async addAction(params: CreateActionDto): Promise<Actions> {
    const createAction = new this.actionModel(params as any);

    return await createAction.save();
  }

  async updateAction(id: string, params: UpdateActionDto): Promise<Actions> {
    return await new Promise((resolve, reject) => {
      this.actionModel.findOneAndUpdate({ _id: id }, { $set: {
        type: params.type,
        titre: params.titre,
        comment: params.comment,
        montant: params.montant,
        data: params.date,
        valid: params.valid,
      } }, (err, doc) => {
        if (err) {
          reject(err);
        }
        resolve(doc);
      });
    });
  }

  async deleteAction(id: string): Promise<Actions> {
    return await new Promise((resolve, reject) => {
      this.actionModel.findByIdAndDelete({ _id: id }, (err, doc) => {
        if (err) {
          reject(err);
        }
        resolve(doc);
      });
    });
  }
}
