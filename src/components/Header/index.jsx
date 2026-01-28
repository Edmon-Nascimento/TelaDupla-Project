import { Link } from "react-router-dom"
import "./index.css"

function Header(){
    return(
        <header>
            <Link to="/" className="logo">TelaDupla</Link>
            <Link to="/favoritos" className="favoritos">Favoritos</Link>
        </header>
    )
}

export default Header