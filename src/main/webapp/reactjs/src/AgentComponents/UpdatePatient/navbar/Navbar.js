import "./Navbar.css";
import avatar from "../../assets/avatar.svg";
import { Link } from "react-router-dom";



const Navbar = ({ sidebarOpen, openSidebar }) => {
  
  return (
    
    <nav className="navbar">
      <div className="nav_icon" onClick={() => openSidebar()}>
        <i className="fa fa-bars" aria-hidden="true"></i>
      </div>
      <div className="navbar__left">
        <a className="active_link" href="#">
          Gestion Agents
        </a>
      </div>
      <div className="navbar__right">
        
        <Link to={"/profilAgent"}>
        <a href="#!">
          <img width="30" src={avatar} alt="avatar" />
        </a>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
