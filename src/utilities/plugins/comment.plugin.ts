import { Schema } from 'mongoose';

export const commentPlugin = (schema: Schema) => {
  schema.pre('find', async function () {
    await this.populate('author');
    await this.populate('book');
  });
};
