import {
  Injectable,
  Inject,
  HttpStatus,
  NotFoundException,
  PipeTransform,
  ForbiddenException,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { handleException } from 'src/utilities';
import { CommentService } from '../comment.service';

@Injectable()
export class CommentOperationPipe implements PipeTransform {
  constructor(
    @Inject(REQUEST) private request: Request,
    private commentService: CommentService,
  ) {}

  async transform(_id: string) {
    const comment = await this.commentService.findOne({ _id });

    if (!comment) {
      handleException(
        HttpStatus.NOT_FOUND,
        'comment-001',
        'Comment Does Not Exist',
      );
    }

    const user: any = this.request.user;

    if (user._id.toString() !== comment.author._id.toString()) {
      handleException(
        HttpStatus.FORBIDDEN,
        'comment-002',
        'User Lacks The Required Permission.',
      );
      throw new ForbiddenException('User Lacks The Required Permissions.');
    }

    return comment;
  }
}
