import { Schema } from 'mongoose';

export const bookPlugin = (schema: Schema) => {
  schema.pre('find', function (next) {
    this.populate('author');
    next();
  });
  schema.post('save', async function (book, next) {
    await book.populate('author');
    next();
  });
};
