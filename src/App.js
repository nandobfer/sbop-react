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
import { Planos } from './pages/Planos';
import { useMuiTheme } from './hooks/useMuiTheme';
import { ThemeProvider } from '@mui/material';
import { Reload } from './components/Reload';
import { Perfil } from './pages/Perfil';
import { CategoriesProvider } from './contexts/categoriesContext';
import { ContentsProvider } from './contexts/contentsContext';

function App() {
    const muiTheme = useMuiTheme()

  return (

    <BrowserRouter>
        <ThemeProvider theme={muiTheme}>
            <MembroProvider>
                <CurrentStageProvider>
                    <SpecializationsProvider>
                        <CategoriesProvider>
                            <ContentsProvider>

                                <Routes>
                                        <Route index element={<Home />} />
                                        <Route path='/home/*' element={<Home />} />
                                        <Route path='/mapa' element={<Mapa />} />
                                        <Route path='/:cpf' element={<Blank />} />

                                        <Route path='/temporario' element={<Temporario />} />
                                        <Route path='/temporario/:id' element={<Temporario />} />
                                        {/* <Route path='/cadastro' element={<Resignup />} /> */}
                                        <Route path='/recadastro' element={<Resignup />} />
                                        <Route path='/planos' element={<Planos />} />
                                        <Route path='/planos/:id' element={<Planos />} />
                                        <Route path='/cadastrar' element={<Cadastro />} />
                                        <Route path='/pagseguro/:id/:plan' element={<Pagseguro />} />
                                        <Route path='/pagseguro_homologacao' element={<PagseguroHomologation />} />
                                        <Route path='/logout' element={<Reload />} />

                                        <Route path='/perfil/*' element={<Perfil />} />
                                </Routes>

                            </ContentsProvider>
                        </CategoriesProvider>
                    </SpecializationsProvider>
                </CurrentStageProvider>
            </MembroProvider>
        </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
