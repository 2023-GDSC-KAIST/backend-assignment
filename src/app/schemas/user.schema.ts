import mongoose, { Model, Schema } from 'mongoose';
import bcrypt from 'bcrypt';

export interface IUser {
  username: string;
  userID: string;
  password: string;
  email: string;
}

interface UserModel extends Model<IUser> {}

const UserSchema = new Schema<IUser, UserModel>(
  {
    username: {
      type: String,
      required: true,
    },
    userID: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
UserSchema.pre<IUser>('save', async function (next) {
  const user = this;
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(user.password, salt);
  user.password = hash;
  next();
});



export const User = mongoose.model<IUser, UserModel>('User', UserSchema);
