import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import './Login.css'
import users from "../data/User.json"; // 👈 importás el JSON como módulo

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const user = users.find(
            (u) => u.username === username && u.password === password
        );

        if (user) {
            login(user);
            navigate("/");
        } else {
            setError("Usuario o contraseña incorrectos");
        }
    };

    return (
        <div className="login-container">

            <h2>Iniciar sesión</h2>
            <form onSubmit={handleSubmit}>
                <input
                    placeholder="Usuario"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    placeholder="Contraseña"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Ingresar</button>
                {error && <p>{error}</p>}
            </form>
        </div>
    );
};

export default Login;
