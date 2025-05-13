import './Cabezal.css';
import { useAuth } from "../context/AuthContext";
import { useLocation } from 'react-router-dom';


export const Cabezal = () => {
  const { user } = useAuth();
  const location = useLocation();
  const ifLoginPage = location.pathname === "/login";


  return (
    <nav>
      <img src="/logoaf.png" alt='LogoAf' className="logo"></img>
      <div className="barnav">
        <h1>Agrotecnica Fueguina</h1>
      </div>
      <div className="usuarioLogeado">
        {user && !ifLoginPage && `Bienvenido, ${user.username}`}
        {user && ifLoginPage && `Ingrese Credenciales`}
      </div>
    </nav>
  );


}