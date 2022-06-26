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
import { ActionsService } from './actions.service';
import { JwtAuthGuard } from '../shareds/guards/jwt-auth.guard';
import { Actions } from '../shareds/interfaces/actions.interface';
import { UpdateActionDto } from '../shareds/dto/actions/update.dto';
import { CreateActionDto } from '../shareds/dto/actions/create.dto';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ErrorsInterceptor } from '../shareds/interceptors/errors.interceptor';

@ApiTags('Actions')
@ApiBearerAuth()
@Controller('actions')
export class ActionsController {
  constructor(private readonly actionService: ActionsService) {}

  @Get(':action')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ErrorsInterceptor)
  @ApiOkResponse({ description: 'Get action by id.' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @ApiNotFoundResponse({ description: 'Action doesnt exist' })
  async findById(@Param('id') id: string): Promise<Actions> {
    return this.actionService.findById(id);
  }

  @Get('bank/:bankId')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ErrorsInterceptor)
  @ApiOkResponse({ description: 'Get all actions by bank.' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @ApiNotFoundResponse({ description: 'Actions or Bank doesnt exist' })
  async findByBank(@Param('bankId') bankId: string): Promise<Actions[]> {
    return this.actionService.findByBank(bankId);
  }

  @Get('bank/:bankId/type/:type')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ErrorsInterceptor)
  @ApiOkResponse({ description: 'Get all actions by bank & type.' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @ApiNotFoundResponse({ description: 'Actions or Bank doesnt exist' })
  async findByType(
    @Param('bankId') bankId: string,
    @Param('type') type: number,
  ): Promise<Actions[]> {
    return this.actionService.findByType(bankId, type);
  }

  @Get('bank/:bankId/date/:date')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ErrorsInterceptor)
  @ApiOkResponse({ description: 'Get all actions by date.' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @ApiNotFoundResponse({ description: 'Actions or Bank doesnt exist' })
  async findByDate(
    @Param('bankId') bankId: string,
    @Param('date') date: Date,
  ): Promise<Actions[]> {
    return this.actionService.findByDate(bankId, date);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ErrorsInterceptor)
  @ApiOkResponse({ description: 'Update action by id' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @ApiNotFoundResponse({ description: 'Action doesnt exist' })
  async updateAction(
    @Param('id') id: string,
    @Body() params: UpdateActionDto,
  ): Promise<Actions> {
    return this.actionService.updateAction(id, params);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ErrorsInterceptor)
  @ApiOkResponse({ description: 'Delete action by id' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @ApiNotFoundResponse({ description: 'Action doesnt exist' })
  async deleteAction(@Param('id') id: string): Promise<Actions> {
    return this.actionService.deleteAction(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ErrorsInterceptor)
  @ApiOkResponse({ description: 'Create action' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  async addAction(@Body() params: CreateActionDto): Promise<Actions> {
    return this.actionService.addAction(params);
  }
}
