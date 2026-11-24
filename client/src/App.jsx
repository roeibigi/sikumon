import { Routes, Route } from 'react-router';

// שלד בלבד. בשלבים 5–6 יתווספו AuthContext, Navbar וכל המסכים.
function Home() {
  return (
    <main className="container">
      <h1>סיכומון</h1>
      <p>מאגר סיכומים לסטודנטים</p>
    </main>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
}
