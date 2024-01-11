import { NavLink } from 'react-router-dom';
import '../styles/NavBar.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faUserPlus, faHouse } from '@fortawesome/free-solid-svg-icons';

function NavBar() {
  return (
    <nav>
      <NavLink to='/signup' className='nav-items' end>
        <FontAwesomeIcon icon={faUserPlus} className='inline-icons' />
      </NavLink>
      <NavLink to='/' className='nav-items' end>
        <FontAwesomeIcon icon={faHouse} className='inline-icons' />
      </NavLink>
      <NavLink to='/settings' className='nav-items' end>
        <FontAwesomeIcon icon={faCog} className='inline-icons' />
      </NavLink>
    </nav>
  );
}

export default NavBar;
