import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { QuotationService } from './quotation.service';
import { CreateQuotationDto } from '../shareds/dto/quotation/create-quotation.dto';
import { UpdateQuotationDto } from '../shareds/dto/quotation/update-quotation.dto';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/shareds/guards/jwt-auth.guard';
import { ErrorsInterceptor } from 'src/shareds/interceptors/errors.interceptor';

@ApiTags('Quotation')
@Controller('quotation')
export class QuotationController {
  constructor(private readonly quotationService: QuotationService) {}

  @Post()
  @UseInterceptors(ErrorsInterceptor)
  @ApiOkResponse({ status: 200, description: 'Create new quotation.' })
  create(@Body() createQuotationDto: CreateQuotationDto) {
    return this.quotationService.create(createQuotationDto);
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ErrorsInterceptor)
  @ApiOkResponse({ status: 200, description: 'Get all quotation.' })
  @ApiForbiddenResponse({ status: 403, description: 'Forbidden.' })
  findAll() {
    return this.quotationService.findAll();
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ErrorsInterceptor)
  @ApiOkResponse({ status: 200, description: 'Find quotation by ID.' })
  @ApiForbiddenResponse({ status: 403, description: 'Forbidden.' })
  @ApiNotFoundResponse({ status: 404, description: 'Quotation doesnt exist' })
  findOne(@Param('id') id: string) {
    return this.quotationService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateQuotationDto: UpdateQuotationDto,
  ) {
    return this.quotationService.update(+id, updateQuotationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.quotationService.remove(+id);
  }
}
