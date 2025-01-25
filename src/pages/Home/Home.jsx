import Style from "./Home.module.css";

///
import { NavLink } from "react-router-dom";

const Home = () => {
  return (
    <div>
      
      <div className={Style.titleHome}>
        <h2>
        Bem vindo a sauDoação!
        </h2>
        <p>Aqui você pode ajudar as pessoas necessitadas</p>
      </div>

      <div className={Style.imgHome}>
        <img src="imgLogo.png" alt="" draggable="false"/>
      </div>

      <div className={Style.buttonsHome}>
        
          <NavLink to="/login">
        <button>
          Entrar
        </button>
          </NavLink>
        
          <NavLink to="/registro">
        <button>
          Registro
        </button>
          </NavLink>
      
      </div>

    </div>
  )
}

export default Home