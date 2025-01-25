import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import PropTypes from "prop-types";

const RotaProtegida = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
        const verificarAutenticacao = async () => {
            try {
                // Envia uma requisição para o backend para verificar a autenticação
                const { data } = await axios.get("http://localhost:3000/user/verificarAutenticacao", {
                    withCredentials: true,
                });
                if (data.message === "Autenticado") {  
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                }
            } catch (error) {
                console.error("Erro ao verificar autenticação:", error);
                setIsAuthenticated(false); // Caso ocorra erro, o token não é válido ou expirou
            }
        };

        verificarAutenticacao();
    }, []);

    if (isAuthenticated === null) {
        return <div>Carregando...</div>; // Exibe uma tela de carregamento enquanto verifica
    }

    if (isAuthenticated) {
        return children; // Exibe o conteúdo da rota protegida
    }

    return <Navigate to="/login" replace />; // Redireciona para login se não autenticado
};

RotaProtegida.propTypes = {
    children: PropTypes.node.isRequired, // Valida que o 'children' foi passado
};

export default RotaProtegida;
