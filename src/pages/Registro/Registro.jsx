import { useState } from "react";
import { IMaskInput } from "react-imask";
import Style from "./Registro.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

const Registro = () => {

  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [foto, setFoto] = useState(null);
  const [fotoNome, setFotoNome] = useState("");
  const [fotoPreview, setFotoPreview] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmaSenha, setConfirmaSenha] = useState("");
  const [erros, setErros] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFoto(file);
      setFotoNome(file.name);
      setFotoPreview(URL.createObjectURL(file));
    } else {
      setFoto(null);
      setFotoNome("");
      setFotoPreview("");
    }
  };

  const handleSubmitRegistro = async (e) => {
    e.preventDefault();

    // Validações básicas
    if (!foto) return setErros("Por favor, selecione uma foto.");
    if (senha !== confirmaSenha) {
      setSenha("");
      setConfirmaSenha("");
      return setErros("As senhas não coincidem.");
    }
    if (senha.length <= 5) {
      setSenha("");
      setConfirmaSenha("");
      return setErros("A senha precisa ter no mínimo 6 caracteres!");
    }

    // Criar um FormData para enviar os dados
    const formData = new FormData();
    formData.append("nome", nome);
    formData.append("email", email);
    formData.append("cpf", cpf);
    formData.append("foto", foto); // Adicionar a imagem
    formData.append("senha", senha);

    try {
      const response = await axios.post("http://localhost:3000/user/registro", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      

      if(response.status == 200){
        navigate("/login")
      }

      console.log(response);
    } catch (error) {
      setErros(error.response?.data?.message || "Erro ao registrar.");
      setNome("")
      setEmail("")
      setCpf("")
      setFoto("")
      setFotoNome("")
      setFotoPreview("")
      setSenha("")
      setConfirmaSenha("")
    }
  };

  return (
    <div>
      <div className={Style.divPrincForms}>
        <div className={Style.DivIntoForm}>
          <img src="imgLogo.png" alt="" height="100px" className={Style.imgFormRegistro} draggable="false" />

          <form onSubmit={handleSubmitRegistro}>
            <h1>Registro</h1>

            <label>
              <span>Nome:</span>
              <input type="text" name="nome" value={nome} onChange={(e) => setNome(e.target.value)} required />
            </label>

            <label>
              <span>Email:</span>
              <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </label>

            <label>
              <span>CPF:</span>
              <IMaskInput
                onChange={(e) => setCpf(e.target.value)}
                name="cpf"
                value={cpf}
                mask="000.000.000-00"
                required
              />
            </label>

            <label>
              <span>Foto:</span>
              <input
                type="file"
                name="foto"
                id="fotoInput"
                onChange={handleFileChange}
                style={{ display: "none" }}
                required
              />
              <button
                type="button"
                onClick={() => document.getElementById("fotoInput").click()}
                className={Style.buttonImagem}
              >
                Escolher arquivo
              </button>
              {fotoNome && <p>Arquivo selecionado: {fotoNome}</p>}
            </label>

            <label>
              <span>Senha:</span>
              <input type="password" name="senha" value={senha} onChange={(e) => setSenha(e.target.value)} required />
            </label>

            <label>
              <span>Confirmar senha:</span>
              <input
                type="password"
                name="confirmaSenha"
                value={confirmaSenha}
                onChange={(e) => setConfirmaSenha(e.target.value)}
                required
              />
            </label>

            <button>Registrar</button>
          </form>

          <div className={Style.registrarSeR}>
            <p>
              Já tem uma conta?
              <NavLink to="/login">Clique aqui</NavLink>
            </p>
          </div>
        </div>

        {fotoPreview && <img src={fotoPreview} alt="Pré-visualização" className={Style.imgPreviewRegistro} />}
      </div>

      {erros && <p className={Style.erros}>{erros}</p>}
    </div>
  );
};

export default Registro;
