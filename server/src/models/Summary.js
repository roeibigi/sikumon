import mongoose from 'mongoose';

export const SUMMARY_MIN_LENGTH = 100;
const MAX_TAGS = 10;

const summarySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      minlength: [3, 'Title must be at least 3 characters'],
      maxlength: [120, 'Title must be at most 120 characters'],
    },
    content: {
      type: String,
      required: [true, 'Content is required'],
      trim: true,
      minlength: [SUMMARY_MIN_LENGTH, `Content must be at least ${SUMMARY_MIN_LENGTH} characters`],
      maxlength: [50000, 'Content is too long'],
    },
    // קשר: כל סיכום שייך לקורס אחד (N:1)
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      required: [true, 'Course is required'],
    },
    // קשר: כל סיכום נכתב על ידי משתמש אחד (N:1)
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    tags: {
      type: [{ type: String, trim: true, lowercase: true, maxlength: 30 }],
      validate: {
        validator: (arr) => arr.length <= MAX_TAGS,
        message: `At most ${MAX_TAGS} tags allowed`,
      },
      default: [],
    },
    // שדות מחושבים: השרת מעדכן אותם אחרי כל שינוי בביקורות (שלב 4).
    // שמירה שלהם על הסיכום מאפשרת למיין לפי "הכי מדורג" בלי לחשב מחדש בכל שאילתה.
    avgRating: { type: Number, default: 0, min: 0, max: 5 },
    reviewsCount: { type: Number, default: 0, min: 0 },
    views: { type: Number, default: 0, min: 0 },
  },
  { timestamps: true } // createdAt, updatedAt
);

// הסרת תגיות כפולות וריקות לפני שמירה
summarySchema.pre('validate', function () {
  if (this.isModified('tags')) {
    this.tags = [...new Set(this.tags.filter(Boolean))];
  }
});

// אינדקסים לחיפוש ולמיון המהירים שבאפיון
summarySchema.index({ course: 1 });
summarySchema.index({ author: 1 });
summarySchema.index({ tags: 1 });
summarySchema.index({ avgRating: -1 });
summarySchema.index({ createdAt: -1 });
summarySchema.index({ views: -1 });

export default mongoose.model('Summary', summarySchema);
