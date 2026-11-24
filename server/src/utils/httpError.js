// יוצר שגיאה עם קוד סטטוס, כדי שה-errorHandler יחזיר את הקוד הנכון.
// שימוש: throw httpError(403, 'Not allowed')
export function httpError(status, message) {
  const err = new Error(message);
  err.status = status;
  return err;
}
