import {BsCart3, BsFillArchiveFill, BsFillGearFill, BsFillGrid3X3GapFill, BsGrid1X2Fill, BsListCheck, BsMenuButtonFill, BsMenuButtonWideFill, BsPeopleFill} 
from 'react-icons/bs';
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <aside id='sidebar'>
        <div className='sidebar-title'>
            <div className='sidebar-brand'>
                <BsCart3 className='icon'/> SHOP
            </div>
            <span className='icon close-icon'>X</span>
        </div>

        <ul className='sidebar-list'>
            <li className='sidebar-list-item'>
                <a href=''>
                    <BsGrid1X2Fill className='icon'/> Dashboard
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href=''>
                    <BsFillArchiveFill className='icon'/> Productos
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href=''>
                    <BsFillGrid3X3GapFill className='icon'/> Categorías
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href=''>
                    <BsPeopleFill className='icon'/> Clientes
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href=''>
                    <BsListCheck className='icon'/> Inventario
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href=''>
                    <BsMenuButtonWideFill className='icon'/> Reportes
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href=''>
                    <BsFillGearFill className='icon'/> Configuración
                </a>
            </li>
        </ul>
    </aside>
  )
}

export default Sidebar