import { Outlet, Link } from "react-router-dom"
import './styles.css'

const Header = () => {
    return (<>
        <header>
            <nav>
                <ul className="navbar">
                    <Link to="/movies"><li className="header-item"><button>Home</button></li></Link>
                    <Link to='/movies'><li className="header-item"><button>Movies</button></li></Link>
                </ul>
            </nav>
        </header>
        <Outlet className="outlet" />
    </>)
}

export default Header