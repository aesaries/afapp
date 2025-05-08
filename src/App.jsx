import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom"
import { FormProvider } from "./components/FormContext"
import { Cabezal } from './components/Cabezal'
import { Menu } from './pages/Menu'
import { Pie } from './components/Pie'
import { Memo } from "./pages/Memos"
import { Personal } from "./pages/Personal"
import { Memorator } from "./components/Memorator"
import './App.css'
import { Resultado } from "./components/Resultado"
import { Equipos } from "./components/Equipos"
import Login from "./pages/Login"
import { AuthProvider } from "./context/AuthContext"
import PrivateRoute from "./routes/PrivateRoute"
import LayoutGeneral from "./components/LayoutGeneral";

function AppContent() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  return (
    <>
      {!isLoginPage && (
        <Link to="/">
          <Cabezal />
        </Link>
      )}

      <FormProvider>
        <Routes>
          <Route path="/login" element={<LayoutGeneral> <Login /> </LayoutGeneral>} />

          {/* Rutas protegidas */}
          <Route path="/" element={<PrivateRoute><Menu /></PrivateRoute>} />
          <Route path="/personal" element={<PrivateRoute><Personal /></PrivateRoute>} />
          <Route path="/memo" element={<PrivateRoute><Memo /></PrivateRoute>} />
          <Route path="/resultado" element={<PrivateRoute><Resultado /></PrivateRoute>} />
          <Route path="/memorator" element={<PrivateRoute><Memorator /></PrivateRoute>} />
          <Route path="/equipos" element={<PrivateRoute><Equipos /></PrivateRoute>} />
        </Routes>
      </FormProvider>

      {!isLoginPage && <Pie />}
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
