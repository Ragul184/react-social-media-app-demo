import { useContext } from 'react';
import { FaMobileAlt, FaTabletAlt, FaLaptop } from 'react-icons/fa';
import DataContext from './context/DataContext';

const Header = () => {
    const { title = "RK Social Media", width } = useContext(DataContext);
    return (
        <header className="Header">
            <h1>{title}</h1>
            {width < 768 ? <FaMobileAlt />
                : width < 992 ? <FaTabletAlt />
                    : <FaLaptop />}
        </header>
    )
}

export default Header