import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";

/////pages
import Home from './pages/Home/Home';
import PageInicial from './pages/PageInicial/PageInicial';
import About from './pages/About/About';
import Registro from './pages/Registro/Registro';
import Login from './pages/Login/Login';

/////components
import NotFound from "./components/NotFound/NotFound";

////proteção das rotas
import RotaProtegida from './components/RotaProtegida';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* Rota pública */}
          <Route path='/' element={<Home />} />

          {/* Rotas protegidas */}
          <Route path='/pageInicial' element={<RotaProtegida> <PageInicial /> </RotaProtegida>}/>
          <Route path='/about' element={<RotaProtegida> <About /> </RotaProtegida>}/>

          {/* Rotas públicas */}
          <Route path='/login' element={<Login />} />
          <Route path='/registro' element={<Registro />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
