import {
  Injectable,
  Inject,
  NotFoundException,
  PipeTransform,
  ForbiddenException,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { CommentService } from '../comment.service';

@Injectable()
export class CommentUpdatePipe implements PipeTransform {
  constructor(
    @Inject(REQUEST) private request: Request,
    private commentService: CommentService,
  ) {}

  async transform(_id: string) {
    const comment = await this.commentService.findOne({ _id });

    if (!comment) {
      throw new NotFoundException('comment does not exist');
    }

    const user: any = this.request.user;

    if (user._id.toString() !== comment.author._id.toString()) {
      throw new ForbiddenException('user lacks the required permissions');
    }

    return comment;
  }
}
