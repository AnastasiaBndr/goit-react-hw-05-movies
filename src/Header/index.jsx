import { Outlet, NavLink } from "react-router-dom"
import './styles.css'

const Header = () => {
    return (<>
        <header>
            <nav>
                <ul className="navbar">
                    <NavLink activeClassName="active-button" to="/movies"><li className="header-item"><button>Home</button></li></NavLink>
                    <NavLink activeClassName="active-button" to='/search'><li className="header-item"><button>Movies</button></li></NavLink>
                </ul>
            </nav>
        </header>
        <Outlet className="outlet" />
    </>)
}

export default Header