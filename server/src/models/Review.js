import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    // קשר: הביקורת שייכת לסיכום אחד (N:1)
    summary: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Summary',
      required: true,
    },
    // קשר: הביקורת נכתבה על ידי משתמש אחד (N:1)
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    rating: {
      type: Number,
      required: [true, 'Rating is required'],
      min: [1, 'Rating must be between 1 and 5'],
      max: [5, 'Rating must be between 1 and 5'],
      validate: {
        validator: Number.isInteger,
        message: 'Rating must be a whole number',
      },
    },
    comment: {
      type: String,
      trim: true,
      maxlength: [1000, 'Comment must be at most 1000 characters'],
      default: '',
    },
  },
  { timestamps: true }
);

// כלל "דירוג אחד למשתמש": אינדקס ייחודי על הצירוף summary + user.
// ניסיון לדרג שוב את אותו סיכום → שגיאת 11000 מ-MongoDB → 409 ב-errorHandler.
reviewSchema.index({ summary: 1, user: 1 }, { unique: true });

export default mongoose.model('Review', reviewSchema);
