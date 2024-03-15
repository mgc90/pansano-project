import Home from './components/Home/Home';
import CartContent from './components/CartContent/CartContent';
import DataProvider from './components/Context/DataContext';
import { BrowserRouter, HashRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <DataProvider>
      <HashRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/cart' element={<CartContent />} />
      </Routes>
    </HashRouter>
    </DataProvider>
    
  );
}

export default App;
