import {BsCart3, BsFillArchiveFill, BsFillGearFill, BsFillGrid3X3GapFill, BsGrid1X2Fill, BsMenuButtonFill, BsPeopleFill} 
from 'react-icons/bs';

const AdminHome = () => {
  return (
    <main className='main-container'>
        <div className='main-title'>
            <h3>DASHBOARD</h3>
        </div>

        <div className='main-cards'>
            <div className='card'>
                <div className='card-inner'>
                    <h3>PRODUCTOS</h3>
                    <BsFillArchiveFill className='card-icon' />
                </div>
                <h1>1500</h1>
            </div>
            <div className='card'>
                <div className='card-inner'>
                    <h3>CATEGORÍAS</h3>
                    <BsPeopleFill className='card-icon' />
                </div>
                <h1>1500</h1>
            </div>
            <div className='card'>
                <div className='card-inner'>
                    <h3>ALERTAS</h3>
                    <BsFillBellill className='card-icon' />
                </div>
                <h1>1500</h1>
            </div>
            
        </div>
    </main>
  )
}

export default AdminHome