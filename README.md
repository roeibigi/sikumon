# סיכומון (Sikumon)

מאגר סיכומים לסטודנטים. כל סטודנט יכול להעלות סיכום לקורס, וסטודנטים אחרים מדרגים ומגיבים, כך שהסיכומים הטובים עולים לראש הרשימה.

פרויקט גמר Fullstack · מגישים: [שם 1], [שם 2]

## טכנולוגיות

| צד | טכנולוגיה |
|---|---|
| שרת | Node.js, Express 5, MongoDB + Mongoose |
| לקוח | React, Vite, React Router |
| אימות | JWT בקוקי httpOnly |

## מבנה הפרויקט

```
sikumon/
├── package.json          # סקריפטים להרצת שרת ולקוח יחד
├── server/
│   ├── .env.example      # תבנית למשתני סביבה
│   └── src/
│       ├── index.js      # נקודת כניסה: חיבור ל-DB והפעלת השרת
│       ├── app.js        # הגדרת Express: middleware ונתיבים
│       ├── config/       # חיבור למסד הנתונים
│       ├── models/       # סכמות Mongoose (users, courses, summaries, reviews)
│       ├── routes/       # הגדרת נתיבי ה-API
│       ├── controllers/  # הלוגיקה של כל נתיב
│       ├── middleware/   # requireAuth, requireAdmin, טיפול בשגיאות
│       └── utils/        # פונקציות עזר
└── client/
    ├── vite.config.js    # כולל proxy מ-/api לשרת
    └── src/
        ├── api/          # פונקציות לקריאה לשרת
        ├── components/   # קומפוננטות לשימוש חוזר (Navbar, SummaryCard...)
        ├── context/      # AuthContext, ThemeContext
        └── pages/        # המסכים
```

## התקנה והרצה

דרישות: Node.js 20 ומעלה ו-MongoDB (מקומי או Atlas).

```bash
npm run install:all
```

```bash
cp server/.env.example server/.env
```

עורכים את `server/.env` וממלאים `MONGO_URI` ו-`JWT_SECRET`, ואז:

```bash
npm run dev
```

- לקוח: http://localhost:5173
- שרת: http://localhost:5000 (בדיקה: `GET /api/health`)

## משתני סביבה (server/.env)

| משתנה | תיאור |
|---|---|
| `PORT` | פורט השרת (ברירת מחדל 5000) |
| `MONGO_URI` | כתובת החיבור ל-MongoDB |
| `JWT_SECRET` | מפתח סודי לחתימת הטוקן |
| `JWT_EXPIRES_IN` | תוקף הטוקן, למשל `7d` |
| `NODE_ENV` | `development` או `production` |
