import { Outlet, NavLink } from "react-router-dom"
import './styles.css'


const Header = () => {
    return (<>
        <header>
            <nav>
                <ul className="navbar">
                    <li className="header-item"><NavLink className="nav-element" to="/movies">Home</NavLink></li>
                    <li className="header-item"><NavLink className="nav-element" to='/search'
                    >Movies</NavLink></li>
                </ul>
            </nav>
        </header>
        <Outlet className="outlet" />
    </>)
}

export default Header