import { Schema } from 'mongoose';

export const commentPlugin = (schema: Schema) => {
  schema.pre('find', async function () {
    await this.populate('author');
    await this.populate('book');
  });
  schema.post('save', async function (this, next) {
    await this.populate('author');
    await this.populate('book');
    next();
  });
};
