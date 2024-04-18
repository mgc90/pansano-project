import {BsFillArchiveFill, BsFillBellFill, BsFillGrid3X3GapFill, BsPeopleFill} from 'react-icons/bs';
import { Link } from 'react-router-dom';

import SimpleBarChart from '../Charts/SimpleBarChart/SimpleBarChart';
import SimpleLineChart from '../Charts/SimpleLineChart/SimpleLineChart';

import "./AdminHome.css"

const AdminHome = () => {
  return (
    <main className='main-container'>
        <div className='main-title'>
            <h3>DASHBOARD</h3>
        </div>

        <div className='main-cards'>

            <div className='productsCard' id='card'>
                <div className='card-inner'>
                    <h3>PRODUCTOS</h3>
                    <BsFillArchiveFill className='card-icon' />
                </div>
                <h1>10</h1>
            </div>
            <Link to={"/admin/pedidos-dash"} >
            <div className='categories' id='card'>
                    <div className='card-inner' >
                        <h3>PEDIDOS</h3>
                        <BsFillGrid3X3GapFill className='card-icon' />
                    </div>
                <h1>1500</h1>
            </div>
            </Link>
            <div className='customers' id='card'>
                <div className='card-inner'>
                    <h3>CLIENTES</h3>
                    <BsPeopleFill className='card-icon' />
                </div>
                <h1>1500</h1>
            </div>
            <div className='alerts' id='card'>
                <div className='card-inner'>
                    <h3>ALERTAS</h3>
                    <BsFillBellFill className='card-icon' />
                </div>
                <h1>1500</h1>
            </div>
        </div>
        <div className='charts'>
                <SimpleBarChart />
                <SimpleLineChart />
        </div>
    </main>
  )
}

export default AdminHome