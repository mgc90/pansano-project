import {BsCart3, BsFillArchiveFill, BsFillGearFill, BsFillGrid3X3GapFill, BsGrid1X2Fill, BsListCheck, BsMenuButtonWideFill, BsPeopleFill} 
from 'react-icons/bs';
import "./Sidebar.css";
import { Link } from 'react-router-dom';

const Sidebar = ({openSidebarToggle, OpenSidebar}) => {
  return (
    <aside id='sidebar' className={openSidebarToggle ? "sidebar-responsive" : ""}>
        <div className='sidebar-title'>
            <div className='sidebar-brand'>
                <BsCart3 className='icon-header'/> ADMIN
            </div>
            <span className='icon close-icon' onClick={OpenSidebar}>X</span>
        </div>

        <ul className='sidebar-list'>
            <li className='sidebar-list-item'>
                <Link to={"/admin"} title='Volver al dashboard' >
                <a href='a'>
                    <BsGrid1X2Fill className='icon'/> Dashboard
                </a>
                </Link> 
            </li>
            <li className='sidebar-list-item'>
                
                <a href='b'>
                    <BsFillArchiveFill className='icon'/> Productos
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href='c'>
                    <BsFillGrid3X3GapFill className='icon'/> Categorías
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href='d'>
                    <BsPeopleFill className='icon'/> Clientes
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href='e'>
                    <BsListCheck className='icon'/> Inventario
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href='f'>
                    <BsMenuButtonWideFill className='icon'/> Reportes
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href='g'>
                    <BsFillGearFill className='icon'/> Configuración
                </a>
            </li>
        </ul>
    </aside>
  )
}

export default Sidebar