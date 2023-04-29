import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IUser extends Document {
  username: string;
  password: string;
  salt: string;
  name: string;
  email: string;
}

interface UserModel extends Model<IUser> {}

export interface UserDocument extends IUser, Document {}

const UserSchema = new Schema<IUser, UserModel>({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  }
});

export const User = mongoose.model<IUser, UserModel>('User', UserSchema);
