import {BsFillArchiveFill, BsTruck, BsListCheck, BsPeopleFill} from 'react-icons/bs';
import { Link } from 'react-router-dom';

import SimpleBarChart from '../Charts/SimpleBarChart/SimpleBarChart';
import SimpleLineChart from '../Charts/SimpleLineChart/SimpleLineChart';

import "./AdminHome.css"

const AdminHome = () => {
  return (
    <main className='main-container'>
        <div className='main-title'>
            <h3>Panel General</h3>
        </div>

        <div className='main-cards'>
            <Link to={"/admin/productos-dash"} className='link' >
            <div className='productsCard' id='card'>
                <div className='card-inner'>
                    <h3>PRODUCTOS</h3>
                    <BsFillArchiveFill className='card-icon' />
                </div>
                <h1>10</h1>
            </div>
            </Link>
            
            <Link to={"/admin/pedidos-dash"} className='link' >
            <div className='categories' id='card'>
                    <div className='card-inner' >
                        <h3>PEDIDOS</h3>
                        <BsListCheck className='card-icon' />
                    </div>
                <h1>500</h1>
            </div>
            </Link>
            <Link to={"/admin/clientes-dash"} className='link' >
            <div className='customers' id='card'>
                <div className='card-inner'>
                    <h3>CLIENTES</h3>
                    <BsPeopleFill className='card-icon' />
                </div>
                <h1>700</h1>
            </div>
            </Link>
            <Link to={"/admin/envios-dash"} className='link' >
            <div className='alerts' id='card'>
                <div className='card-inner'>
                    <h3>ENVÍOS</h3>
                    <BsTruck className='card-icon' />
                </div>
                <h1>300</h1>
            </div>
            </Link>
        </div>
        <div className='charts'>
                <SimpleBarChart />
                <SimpleLineChart />
        </div>
    </main>
  )
}

export default AdminHome