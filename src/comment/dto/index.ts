import { PartialType, PickType } from '@nestjs/swagger';
import { Comment } from '../comment.schema';

export class CreateCommentDto extends Comment {}

export class UpdateCommentDto extends PartialType(
  PickType(Comment, ['rating', 'text'] as const),
) {}
