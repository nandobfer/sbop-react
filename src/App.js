import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';

function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route index element={<Home />} />
            {/* <Route path='/cadastrar/' element={<Cadastro />} /> */}
        </Routes>
    </BrowserRouter>
  );
}

export default App;
