import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Course name is required'],
      trim: true,
      minlength: [2, 'Course name must be at least 2 characters'],
      maxlength: [100, 'Course name must be at most 100 characters'],
    },
    code: {
      type: String,
      required: [true, 'Course code is required'],
      unique: true, // קוד קורס ייחודי (דרישה מהאפיון)
      trim: true,
      uppercase: true, // "cs101" ו-"CS101" נחשבים אותו קוד
      match: [/^[A-Z0-9-]{2,20}$/, 'Code may contain only letters, digits and "-" (2–20 chars)'],
    },
    lecturer: {
      type: String,
      trim: true,
      maxlength: [60, 'Lecturer name must be at most 60 characters'],
    },
    semester: {
      type: String,
      trim: true,
      maxlength: [20, 'Semester must be at most 20 characters'],
    },
    // קשר: המנהל שיצר את הקורס (הקו המקווקו ב-ERD)
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Course', courseSchema);
