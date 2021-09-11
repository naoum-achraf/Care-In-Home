import "./Sidebar1.css";
import logo from "../../assets/logoCih.png";
import authService from "../../../services/auth.service";

const Sidebar = ({ sidebarOpen, closeSidebar }) => {  
  return (
    <div className={sidebarOpen ? "sidebar_responsive" : ""} id="sidebar">
      <div className="sidebar__title">
        <div className="sidebar__img">
          <img src={logo} alt="logo" />
          <h1>CareInHome</h1>
        </div>
        <i
          onClick={() => closeSidebar()}
          className="fa fa-times"
          id="sidebarIcon"
          aria-hidden="true"
        ></i>
      </div>

      <div className="sidebar__menu">
        <div className="sidebar__link">
          <i className="fa fa-home"></i>
          <a href="#">Dashboard</a>
        </div>
        
        <h2>Gestion</h2>
        <div className="sidebar__link">
          <i className="fa fa-medkit" aria-hidden="true"></i>
          <a href="/crudPatient">Patients</a>
        </div>
        <div className="sidebar__link">
          <i className="fa fa-hospital-o"></i>
          <a href="/suivre">Etats des Patients</a>
        </div>
        <div className="sidebar__link">
          <i className="fa fa-handshake-o"></i>
          <a href="#">Messagerie</a>
        </div>
        
        <div className="sidebar__logout">
          <i className="fa fa-power-off"></i>
          <a href="/login" onClick={authService.logout}>Log out</a>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;