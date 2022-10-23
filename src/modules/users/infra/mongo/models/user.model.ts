import mongoose from 'mongoose';

import { ModelBase } from '../../../../../core/infra/mongo/ModelBase';
import { UserProps, UserRoleEnum } from '../../../domain/User';

type UserModel = UserProps & ModelBase;

export const UserSchema = new mongoose.Schema<UserModel>({
  _id: { type: String, require: true },

  email: { type: String, lowercase: true, unique: true, required: true, trim: true },
  username: { type: String, trim: true },
  password: { type: String, required: true },
  roles: {
    type: [
      {
        type: String,
        enum: Object.values(UserRoleEnum),
      },
    ],
  },

  verificationEmailSentAt: { type: Date },
  emailVerifiedAt: { type: Date },

  createdAt: { type: Date, required: true, default: new Date() },
  updatedAt: { type: Date, required: true, default: new Date() },
});

UserSchema.pre('save', async function (next: (err?: Error) => void) {
  // here we need to retype 'this' because by default it is
  // of type Document from which the 'IUser' interface is inheriting
  // but the Document does not know about our password property
  const thisObj = this as UserModel;

  try {
    thisObj.updatedAt = new Date();

    return next();
  } catch (e: any) {
    return next(e);
  }
});

export const userModel = mongoose.model('User', UserSchema);
