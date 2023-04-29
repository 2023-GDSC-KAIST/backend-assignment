import mongoose, { Document, Model, Schema } from 'mongoose';
import bcrypt from 'bcrypt';

export interface IUser extends Document {
    username: string;
    password: string;
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

UserSchema.pre('save', async function (next: Function) {
    try {
      if (!this.isModified('password')) {
        return next();
      }
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(this.password, salt);
      this.password = hash;
      next();
    } catch (err) {
      return next(err);
    }
});
  
