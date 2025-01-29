import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Style from "./PageInicial.module.css";
import axios from "axios";

const PageInicial = () => {
  const [Message, setMessage] = useState("");

  useEffect(() => {
    // Define o setTimeout para esconder a mensagem após 2 segundos
    const timer = setTimeout(() => {
      setMessage(""); // Faz a mensagem desaparecer
    }, 2000);

    // Limpeza do setTimeout caso o componente seja desmontado antes de 2 segundos
    return () => clearTimeout(timer);
  }, []);

  // const [authTorF, setAuthTorF] = useState(false); // Controla a exibição do formulário
  const [isDorD, setIsDorD] = useState(""); // Estado para armazenar a opção selecionada
  const [formVisible, setFormVisible] = useState(false); // Novo estado para controlar a visibilidade do formulário

  // Função para buscar dados do usuário
  const dadosUser = async () => {
    try {
      const response = await axios.get("http://localhost:3000/user/getDadosUser", {
        withCredentials: true, // Inclui cookies na requisição
      });

      // Verifica se o usuário já tem os campos "doador" ou "donatario" definidos como true
      if (response.data.doador === true || response.data.donatario === true) {
        setFormVisible(false); // Se já for doador ou donatário, não mostra o formulário
      } else {
        setFormVisible(true); // Caso contrário, mantém o formulário visível
      }
    } catch (error) {
      console.error("Erro ao buscar os dados do usuário:", error);
    }
  };

  useEffect(() => {
    dadosUser(); // Chama a função ao carregar o componente
  }, []); // Não é necessário passar authTorF como dependência

  // Função para enviar o formulário
  const postDorD = async () => {
    setMessage("Você é: " + isDorD);
    setFormVisible(false);

    try {
      const response = await axios.post("http://localhost:3000/user/isDorD", { isDorD }, { withCredentials: true });
    } catch (error) {
      console.log("Erro ao enviar os dados:", error);
      // Se houver erro, podemos reexibir o formulário (opcional)
      setFormVisible(true);
    }
  };

  return (
    <div>
      <Navbar />
        {Message && <div className={Style.setMessageDiv}>{Message}</div>}
      <div className={Style.pessoasAjuda}>
        <div>
          <h2>Pessoas que precisam de ajuda</h2>
        </div>
      </div>

      {formVisible ? (
        <div className={Style.divPrincDorD}>
          <form>
            <legend>
              <h3>Opa, parece que você ainda não escolheu!</h3>
              <h2>Selecione uma opção:</h2>
            </legend>

            <div>
              <label>
                <input
                  type="radio"
                  name="userType"
                  value="doador"
                  onChange={(e) => setIsDorD(e.target.value)} // Atualiza o estado
                />
                Você é doador
              </label>

              <label>
                <input
                  type="radio"
                  name="userType"
                  value="donatario"
                  onChange={(e) => setIsDorD(e.target.value)} // Atualiza o estado
                />
                Você é donatário
              </label>
            </div>

            <div className={Style.divButtonIsDorD}>
              <button
                type="button"
                onClick={() => {
                  if (isDorD) {
                    postDorD(); // Envia os dados ao backend
                  } else {
                    alert("Selecione uma opção antes de enviar!");
                  }
                }}
              >
                Enviar
              </button>
            </div>
          </form>
        </div>
      ) : null} 
    </div>
  );
};

export default PageInicial;
