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

function App() {
  return (
    <DataProvider>
      <HashRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<CartContent />} />
          <Route path='/admin' element={<AdminPanel />} />
          <Route path='/admin/productos-dash' element={<ProductosDash />} />
          <Route path='/admin/pedidos-dash' element={<PedidosDash />} />
          <Route path='/admin/clientes-dash' element={<ClientesDash />} />
          <Route path='/admin/envios-dash' element={<EnviosDash />} />
          <Route path='/admin/categorias-dash' element={<CategoriasDash />} />

        </Routes>
      </HashRouter>
    </DataProvider>
    
  );
}

export default App;
