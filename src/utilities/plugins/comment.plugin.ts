import { Schema } from 'mongoose';

export const commentPlugin = (schema: Schema) => {
  schema.pre('find', async function () {
    this.populate('author');
  });
  schema.post('save', async function (comment, next) {
    await comment.populate('author');
    next();
  });
};
