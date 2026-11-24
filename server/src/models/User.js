import mongoose from 'mongoose';

export const ROLES = ['student', 'admin'];
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
      minlength: [2, 'Full name must be at least 2 characters'],
      maxlength: [60, 'Full name must be at most 60 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true, // אינדקס ייחודי ב-MongoDB, כפילות → 409 ב-errorHandler
      trim: true,
      lowercase: true, // Roei@Mail.com ו-roei@mail.com נחשבים אותו אימייל
      match: [EMAIL_REGEX, 'Invalid email format'],
    },
    passwordHash: {
      type: String,
      required: true,
      select: false, // לא נשלף בשאילתות רגילות, רק עם .select('+passwordHash') בהתחברות
    },
    role: {
      type: String,
      enum: { values: ROLES, message: 'Role must be student or admin' },
      default: 'student',
    },
  },
  { timestamps: true } // מוסיף createdAt ו-updatedAt אוטומטית
);

// הגנה כפולה: גם אם passwordHash נשלף, הוא לעולם לא יישלח ללקוח ב-JSON
userSchema.set('toJSON', {
  transform: (doc, ret) => {
    delete ret.passwordHash;
    delete ret.__v;
    return ret;
  },
});

export default mongoose.model('User', userSchema);
