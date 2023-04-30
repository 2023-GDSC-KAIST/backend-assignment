import mongoose, { Document, Model, Schema } from 'mongoose';
import bcrypt from 'bcrypt';

export interface IUser extends Document {
  username: string;
  password: string;
  hashedPassword: string;
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
  hashedPassword: {
    type: String,
    required: false
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

// Add a pre-save hook to hash the password before saving to the database
UserSchema.pre<UserDocument>('save', async function (next: () => void): Promise<void> {
  const user = this;
  if (!user.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(user.password, salt);
    user.hashedPassword = hashedPassword;
    return next();
  } catch (err) {
    return next();
  }
});

// Method to compare plain-text password with hashed password
UserSchema.methods.checkPassword = async function (password: string): Promise<boolean> {
  const hashedPassword = this.hashedPassword;
  try {
    const match = await bcrypt.compare(password, hashedPassword);
    return match;
  } catch (err) {
    return false;
  }
};

export const User = mongoose.model<IUser, UserModel>('User', UserSchema);
