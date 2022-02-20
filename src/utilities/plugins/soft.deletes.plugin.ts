import { Schema, Document } from 'mongoose';

export const softDeletesPlugin = (schema: Schema) => {
  type TWithSoftDeleted = {
    deleted_at?: Date;
  };

  type TDocument = TWithSoftDeleted & Document;

  schema.add({
    deleted_at: { type: Date, default: null },
  });

  const softDeleteDocument = async (doc: TDocument) => {
    doc.deleted_at = new Date();
    await doc.save();
  };

  const excludeSoftDeletedFromOperation = async function (this, next) {
    this.where({ deleted_at: null });
    next();
  };

  const operations = [
    'count',
    'find',
    'findOne',
    'findOneAndDelete',
    'findOneAndRemove',
    'findOneAndUpdate',
    'update',
    'updateOne',
    'updateMany',
  ];

  operations.forEach((operation) => {
    schema.pre(operation, excludeSoftDeletedFromOperation);
  });

  schema.methods.softDelete = async function () {
    await softDeleteDocument(this);
  };
};
