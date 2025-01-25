import { useEffect, useState } from "react";
import Style from "./Navbar.module.css";

import {useNavigate} from "react-router-dom";

import axios from "axios";
import { FiLogOut } from "react-icons/fi";

const Navbar = () => {
  const navigate = useNavigate();

  const [horario, setHorario] = useState("");

  useEffect(()=>{
    const hora = new Date();
    const horarioAgora = hora.getHours();
    
    if(horarioAgora >= 5 && horarioAgora <= 11){
      setHorario("Bom dia!")
    }else if(horarioAgora >= 12 && horarioAgora <= 18){
      setHorario("Boa tarde!")
    }else{
      setHorario("Boa noite!")
    }

  },[]);

  const [nomeCompleto, setNomeCompleto] = useState("");
  const nome = nomeCompleto.split(" ")[0]; // Pega o primeiro nome


  const [foto,setFoto] = useState("");

  const dadosUser = async () => {
    try {
      const response = await axios.get("http://localhost:3000/user/getDadosUser", {
        withCredentials: true, // Inclui cookies na requisição
      });
      setFoto(response.data.foto);
      setNomeCompleto(response.data.nome);
    } catch (error) {
      console.error("Erro ao buscar os dados do usuário:", error);
    }
  };

  useEffect(() => {
    dadosUser(); // Chama a função ao carregar o componente
  }, []);

  const logout = async () => {
    try {
      await axios.post("http://localhost:3000/user/logout",{}, { withCredentials: true });
      navigate("/login"); 
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  return (
    <div className={Style.navbarDivPrinc}>
        
        <div className={Style.divNomeFoto}>
          <div>
          <p>Olá {nome},</p>
          {horario}  
          </div>
          
          <img src={foto ? foto : "avatar.png"} height="90px" width="auto" className={Style.imgNavbar}/>
        </div>

        <div className={Style.divLogout}>
          <div><img src="imgLogo.png" height="50px" width="auto" /></div>
          <FiLogOut onClick={logout} className={Style.perfilIconLogout} />
        </div>

    </div>
  )
}

export default Navbar