import { createContext, useContext, useState, useEffect } from "react";
import users from "../data/User.json"; // ⬅️ Importamos el archivo local

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
            try {
                const parsed = JSON.parse(savedUser);
                const valid = users.find(
                    (u) => u.username === parsed.username && u.password === parsed.password
                );
                if (valid) setUser(parsed);
                else localStorage.removeItem("user");
            } catch (err) {
                console.error("Error al validar usuario guardado:", err);
                localStorage.removeItem("user");
            }
        }
    }, []);

    const login = (userData) => {
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
