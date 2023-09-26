import { Outlet } from "react-router-dom"
import './styles.css'

const Header = () => {
    return (<>
        <header>
            <nav>
                <ul className="navbar">
                    <li className="header-item"><button>Home</button></li>
                    <li className="header-item"><button>Movies</button></li>
                </ul>
            </nav>
        </header>
        <Outlet className="outlet" />
    </>)
}

export default Header