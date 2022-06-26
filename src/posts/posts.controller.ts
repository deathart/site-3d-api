import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { PostsSchema } from 'src/shareds/schemas/posts.schema';
import { CreatePostDto } from '../shareds/dto/posts/create.dto';
import { JwtAuthGuard } from '../shareds/guards/jwt-auth.guard';
import { ErrorsInterceptor } from '../shareds/interceptors/errors.interceptor';
import { Posts } from '../shareds/interfaces/posts.interface';
import { PostsService } from './posts.service';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get('')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ErrorsInterceptor)
  @ApiOkResponse({ status: 200, description: 'Get all posts.' })
  @ApiForbiddenResponse({ status: 403, description: 'Forbidden.' })
  async findAll(@Body() params: any): Promise<Posts[]> {
    if (params.valid) {
      return this.postsService.findAllValid();
    }

    return this.postsService.findAll();
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ErrorsInterceptor)
  @ApiOkResponse({ status: 200, description: 'Get post by id.' })
  @ApiForbiddenResponse({ status: 403, description: 'Forbidden.' })
  @ApiNotFoundResponse({ status: 404, description: 'Post doesnt exist' })
  async findById(@Param('id') id: string): Promise<Posts> {
    return this.postsService.findById(id);
  }

  @Post('create')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ErrorsInterceptor)
  @ApiOkResponse({ status: 200, description: 'Create post.' })
  @ApiForbiddenResponse({ status: 403, description: 'Forbidden.' })
  async create(@Body() post: CreatePostDto): Promise<Posts> {
    return this.postsService.create(post);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ErrorsInterceptor)
  @ApiOkResponse({ status: 200, description: 'Update post.' })
  @ApiForbiddenResponse({ status: 403, description: 'Forbidden.' })
  @ApiNotFoundResponse({ status: 404, description: 'Post doesnt exist' })
  async update(
    @Param('id') id: string,
    @Body() post: CreatePostDto,
  ): Promise<Posts> {
    return this.postsService.update(id, post);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ErrorsInterceptor)
  @ApiOkResponse({ status: 200, description: 'Delete post.' })
  @ApiForbiddenResponse({ status: 403, description: 'Forbidden.' })
  @ApiNotFoundResponse({ status: 404, description: 'Post doesnt exist' })
  async delete(@Param('id') id: string): Promise<Posts> {
    return this.postsService.delete(id);
  }
}
