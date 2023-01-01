import { ApiProperty } from '@nestjs/swagger';
import { ApiCommonResponse } from '../../types';
import { Comment } from '../comment.schema';

export class CommentResponse extends ApiCommonResponse {
  @ApiProperty({ type: Comment })
  comment: Comment;
}

export class CommentsResponse extends ApiCommonResponse {
  @ApiProperty({ type: [Comment] })
  comments: Comment[];
}
