import Style from "./Login.module.css";

import { useState } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

    const [email,setEmail] = useState("");
    const [senha,setSenha] = useState("");

    const handleSubmitFormLogin = async(e)=>{
      e.preventDefault();

      try {
        
        const response = await axios.post("http://localhost:3000/user/login", {email,senha}, { withCredentials: true });
        const data = response.data.auth;
        if(data === true){
          navigate("/pageInicial")
        };

      } catch (error) {
        console.log("Errorrr" + error);
      }

    };

  return (
    <div>
        <div className={Style.divPrincForms}>
            <img src="imgLogo.png" alt="" height="100px" className={Style.imgFormRegistro} draggable="false"/>

          <div className={Style.DivIntoForm}>


            <form onSubmit={handleSubmitFormLogin}>
              <h1>Login</h1>
              
              <label>
                <span>Email:</span>
                <input type="email" name="email" value={email} onChange={(e)=> setEmail(e.target.value)} required/>
              </label>
              
              <label>
                <span>Senha:</span>
                <input type="password" name="senha" value={senha} onChange={(e)=> setSenha(e.target.value)} required/>
              </label>
              
              <button>Entrar</button>

            </form>

            <div className={Style.registrarSe}> 
              <p>
              Esqueceu a senha?
              <NavLink to="/recSenha">Clique aqui</NavLink>
              </p>
              <p>
                Não tem uma conta?
              <NavLink to="/registro">Clique aqui</NavLink>
              </p>
            </div>

          </div>
                  
        </div>
    </div>
  )
}

export default Login