import { Controller, Post } from '@nestjs/common';

@Controller('/books/:book_id/comments')
export class CommentController {

    @Post()
    async create(@Body) {

    }
}
