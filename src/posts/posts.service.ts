import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreatePostDto } from '../shareds/dto/posts/create.dto';
import { UpdatePostDto } from '../shareds/dto/posts/update.dto';
import { Posts } from '../shareds/interfaces/posts.interface';

@Injectable()
export class PostsService {
  constructor(
    @Inject('PostsModelToken') private readonly postsModel: Model<Posts>,
  ) {}

  async findById(id: string): Promise<Posts> {
    return await this.postsModel.findById(id).exec();
  }

  async findByTitle(id: string): Promise<Posts> {
    return await this.postsModel.findOne({ title: id }).exec();
  }

  async findAllValid(): Promise<Posts[]> {
    return await this.postsModel.find({ valid: true }).exec();
  }

  async findAll(): Promise<Posts[]> {
    return await this.postsModel.find().exec();
  }

  async delete(id: string): Promise<Posts> {
    return await new Promise((resolve, reject) => {
      this.postsModel.findByIdAndRemove(id, (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  }

  async create(params: CreatePostDto): Promise<Posts> {
    const createPosts = new this.postsModel(params as any);

    return await createPosts.save();
  }

  async update(id: string, params: UpdatePostDto): Promise<Posts> {
    return await new Promise((resolve, reject) => {
      this.postsModel.findOneAndUpdate(
        { _id: id },
        {
          $set: {
            title: params.title,
            content: params.content,
            date: params.date,
            valid: params.valid,
          },
        },
        (err, doc) => {
          if (err) {
            reject(err);
          }
          resolve(doc);
        },
      );
    });
  }
}
