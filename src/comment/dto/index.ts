import { PartialType, PickType } from '@nestjs/mapped-types';
import { Comment } from '../comment.schema';

export class UpdateCommentDto extends PartialType(
  PickType(Comment, ['rating', 'text'] as const),
) {}
