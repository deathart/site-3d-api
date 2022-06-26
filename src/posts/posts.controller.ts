import {
  Body,
  Controller,
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
import { CreatePostDto } from 'src/shareds/dto/posts/create.dto';
import { JwtAuthGuard } from 'src/shareds/guards/jwt-auth.guard';
import { ErrorsInterceptor } from 'src/shareds/interceptors/errors.interceptor';
import { Posts } from 'src/shareds/interfaces/posts.interface';
import { PostsService } from './posts.service';

@ApiTags('Posts')
@ApiBearerAuth()
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get('')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ErrorsInterceptor)
  @ApiOkResponse({ description: 'Get all posts.' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @ApiNotFoundResponse({ description: 'Posts doesnt exist' })
  async findAll(@Body() params: any): Promise<Posts[]> {
    if (params.valid) {
      return this.postsService.findAllValid();
    }

    return this.postsService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ErrorsInterceptor)
  @ApiOkResponse({ description: 'Get post by id.' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @ApiNotFoundResponse({ description: 'Post doesnt exist' })
  async findById(@Param('id') id: string): Promise<Posts> {
    return this.postsService.findById(id);
  }

  @Post('create')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ErrorsInterceptor)
  @ApiOkResponse({ description: 'Create post.' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  async create(@Body() post: CreatePostDto): Promise<Posts> {
    return this.postsService.create(post);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ErrorsInterceptor)
  @ApiOkResponse({ description: 'Update post.' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @ApiNotFoundResponse({ description: 'Post doesnt exist' })
  async update(
    @Param('id') id: string,
    @Body() post: CreatePostDto,
  ): Promise<Posts> {
    return this.postsService.update(id, post);
  }
}
