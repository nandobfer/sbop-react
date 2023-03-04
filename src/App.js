import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import './sass/App.scss';
import './sass/_input.scss';
import './sass/_button.scss';
// import { Perfil } from './pages/Perfil';
import { Cadastro } from './pages/Cadastro';
import { Blank } from './pages/Blank';
import { Mapa } from './pages/Mapa';
import { Pagseguro } from './pages/Pagseguro';
import { PagseguroHomologation } from './pages/PagseguroHomologation';
import { Temporario } from './pages/Temporario';
import { MembroProvider } from './contexts/membroContext';
import { CurrentStageProvider } from './contexts/currentStageContext';
import { Resignup } from './pages/Temporario/Resignup';
import { SpecializationsProvider } from './contexts/specializationsContext';

function App() {

  return (
    <MembroProvider>
        <CurrentStageProvider>
            <SpecializationsProvider>

                <BrowserRouter>
                    <Routes>
                            <Route index element={<Blank />} />
                            <Route path='/mapa' element={<Mapa />} />
                            <Route path='/:cpf' element={<Blank />} />

                            <Route path='/temporario' element={<Temporario />} />
                            <Route path='/temporario/:id' element={<Temporario />} />
                            <Route path='/recadastro' element={<Resignup />} />
                            <Route path='/cadastrar' element={<Cadastro />} />
                            <Route path='/pagseguro/:id/:plan' element={<Pagseguro />} />
                            <Route path='/pagseguro_homologacao' element={<PagseguroHomologation />} />

                            {/* <Route path='/perfil' element={<Perfil />} /> */}
                    </Routes>
                </BrowserRouter>
                
            </SpecializationsProvider>
        </CurrentStageProvider>
    </MembroProvider>
  );
}

export default App;
