// הגדרת אפליקציית Express: middleware גלובליים, נתיבים וטיפול בשגיאות.
// מופרד מ-index.js כדי שאפשר יהיה לייבא את האפליקציה בלי להפעיל שרת (למשל בבדיקות).
import express from 'express';
import cookieParser from 'cookie-parser';
import { notFound, errorHandler } from './middleware/errorHandler.js';

const app = express();

app.use(express.json({ limit: '1mb' })); // פענוח גוף בקשה בפורמט JSON
app.use(cookieParser()); // מאפשר לקרוא את req.cookies (שם יישמר ה-JWT)

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// כאן יחוברו הנתיבים בשלבים הבאים:
// /api/auth, /api/courses, /api/summaries, /api/summaries/:id/reviews

app.use(notFound); // כל נתיב שלא נמצא → 404
app.use(errorHandler); // מטפל שגיאות מרכזי, תמיד אחרון

export default app;
