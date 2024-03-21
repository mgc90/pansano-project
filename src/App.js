import Home from './components/Home/Home';
import CartContent from './components/CartContent/CartContent';
import DataProvider from './components/Context/DataContext';
import AdminPanel from './components/AdminPanel/AdminPanel';
import { HashRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <DataProvider>
      <HashRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<CartContent />} />
          <Route path='/admin' element={<AdminPanel />} />
        </Routes>
      </HashRouter>
    </DataProvider>
    
  );
}

export default App;
