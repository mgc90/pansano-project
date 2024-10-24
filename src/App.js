import Home from './components/Home/Home';
import CartContent from './components/CartContent/CartContent';
import DataProvider from './components/Context/DataContext';
import AdminPanel from './components/AdminPanel/AdminPanel';
import { HashRouter, Routes, Route } from 'react-router-dom';
import ProductosDash from './components/AdminPanel/panelComponents/ProductosDash/ProductosDash';
import PedidosDash from './components/AdminPanel/panelComponents/PedidosDash/PedidosDash';
import ClientesDash from './components/AdminPanel/panelComponents/ClientesDash/ClientesDash';
import EnviosDash from './components/AdminPanel/panelComponents/EnviosDash/EnviosDash';
import CategoriasDash from './components/AdminPanel/panelComponents/CategoriasDash/CategoriasDash';
import BuyForm from './components/BuyForm/BuyForm';
import { FiltersProvider } from './components/Context/filtersContext';
import { ToastProvider } from './components/Context/ToastContext';

function App() {
  return (
    <ToastProvider>
    <DataProvider>
      <FiltersProvider>
      
      <HashRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/BuyForm' element={<BuyForm />} />
          <Route path='/cart' element={<CartContent />} />
          <Route path='/admin' element={<AdminPanel />} />
          <Route path='/admin/productos-dash' element={<ProductosDash />} />
          <Route path='/admin/pedidos-dash' element={<PedidosDash />} />
          <Route path='/admin/clientes-dash' element={<ClientesDash />} />
          <Route path='/admin/envios-dash' element={<EnviosDash />} />
          <Route path='/admin/categorias-dash' element={<CategoriasDash />} />
          
        </Routes>
      </HashRouter>
      
      </FiltersProvider>
    </DataProvider>
    </ToastProvider>
    
  );
}

export default App;
