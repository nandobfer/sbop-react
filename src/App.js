import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import './sass/App.scss';
import './sass/_input.scss';
import './sass/_button.scss';
import { Perfil } from './pages/Perfil';
import { Membro } from './contexts/Membro';
import { useState } from 'react';

function App() {
    const [membro, setMembro] = useState({})
  return (
    <Membro.Provider value={[membro, setMembro]}>
        <BrowserRouter>
            <Routes>
                    <Route index element={<Home />} />
                    <Route path='/perfil' element={<Perfil />} />
                    {/* <Route path='/cadastrar/' element={<Cadastro />} /> */}
            </Routes>
        </BrowserRouter>
    </Membro.Provider>
  );
}

export default App;
