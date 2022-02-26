import { PartialType, PickType } from '@nestjs/swagger';
import { Book } from '../book.schema';

export class CreateBookDto extends Book {}

export class UpdateBookDto extends PartialType(
  PickType(Book, ['name', 'description'] as const),
) {}
