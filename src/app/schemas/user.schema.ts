import mongoose, { Model, Schema } from 'mongoose';

export interface IUser {
  username: string;
  password: string;
  name: string;
  email: string;
}

interface UserModel extends Model<IUser> {
  toJSON(): { [key: string]: any };
}

const UserSchema = new Schema<IUser, UserModel>({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

UserSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  return user;
};

export const User = mongoose.model<IUser, UserModel>('User', UserSchema);
