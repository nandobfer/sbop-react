import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import './sass/App.scss';
import './sass/_input.scss';
import './sass/_button.scss';
import { Perfil } from './pages/Perfil';
import { Membro } from './contexts/Membro';
import { useState } from 'react';
import { Cadastro } from './pages/Cadastro';
import { Blank } from './pages/Blank';
import { Mapa } from './pages/Mapa';
import { Pagseguro } from './pages/Pagseguro';
import { PagseguroHomologation } from './pages/PagseguroHomologation';

function App() {
    const [membro, setMembro] = useState({})
  return (
    <Membro.Provider value={[membro, setMembro]}>
        <BrowserRouter>
            <Routes>
                    <Route index element={<Blank />} />
                    <Route path='/:cpf' element={<Blank />} />
                    <Route path='/perfil' element={<Perfil />} />
                    <Route path='/mapa' element={<Mapa />} />
                    <Route path='/cadastrar/' element={<Cadastro />} />
                    <Route path='/pagseguro/:id/:plan' element={<Pagseguro />} />
                    <Route path='/pagseguro_homologacao' element={<PagseguroHomologation />} />
            </Routes>
        </BrowserRouter>
    </Membro.Provider>
  );
}

export default App;
