// נתיב שלא קיים
export function notFound(req, res, next) {
  res.status(404).json({ message: `Not found: ${req.method} ${req.originalUrl}` });
}

// מטפל שגיאות מרכזי. ב-Express 5, שגיאה שנזרקת בתוך handler אסינכרוני
// מגיעה לכאן אוטומטית, כך שאין צורך ב-try/catch בכל controller.
// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, next) {
  // שגיאת ולידציה של Mongoose → 400 עם הודעה לכל שדה
  if (err.name === 'ValidationError') {
    const errors = Object.fromEntries(
      Object.entries(err.errors).map(([field, e]) => [field, e.message])
    );
    return res.status(400).json({ message: 'Validation failed', errors });
  }

  // מזהה (ObjectId) לא תקין בכתובת → 400
  if (err.name === 'CastError') {
    return res.status(400).json({ message: `Invalid ${err.path}` });
  }

  // הפרת אינדקס ייחודי (אימייל, קוד קורס, ביקורת כפולה) → 409
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue || {}).join(', ');
    return res.status(409).json({ message: `Duplicate value for: ${field}` });
  }

  const status = err.status || 500;
  if (status === 500) console.error(err);
  res.status(status).json({ message: status === 500 ? 'Server error' : err.message });
}
