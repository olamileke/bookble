import { PartialType, PickType } from '@nestjs/mapped-types';
import { Book } from '../book.schema';

export class UpdateBookDto extends PartialType(
  PickType(Book, ['name', 'description'] as const),
) {}
