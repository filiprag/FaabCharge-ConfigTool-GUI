import React from 'react';
import './navbar.css';
import logo from '../../img/Logo_white.png';
import { Link } from 'react-router-dom';

function Navbar() {
    return (

        <nav bg='dark' className="navbar navbar-expand-lg bg-dark navbar-dark px-3 " id="navbar-example2">
            <div className="container-fluid ">
                <img src={logo} width="250" height="" alt="" loading="lazy" style={{ marginTop: "20px", margin: "auto", marginLeft: "25px" }}></img>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page"></a>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" role="button" aria-expanded="false">Configurations</a>
                            <ul className="dropdown-menu">
                                <li><Link to="/AllConfigurations"><a className="dropdown-item">All Configurations</a></Link></li>
                                <li><Link to="/CreateConfiguration"><a className="dropdown-item">New Configuration</a></Link></li>
                                <li><hr className="dropdown-divider"></hr></li>
                                <li><Link to="/CompareConfigurations"><a className="dropdown-item">Compare Configurations</a></Link></li>
                            </ul>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" role="button" aria-expanded="false">Items</a>
                            <ul className="dropdown-menu">
                                <li><Link to="/AllItems"><a className="dropdown-item">All Items</a></Link></li>
                                <li><Link to="/CreateItem"><a className="dropdown-item">New Item</a></Link></li>
                                <li><hr className="dropdown-divider"></hr></li>
                                <li><Link to="/CompareItems"><a className="dropdown-item">Compare Items</a></Link></li>
                            </ul>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" role="button" aria-expanded="false">Components</a>
                            <div className="dropdown1"></div>
                            <ul className="dropdown-menu">
                                <li><Link to="/AllComponents"><a className="dropdown-item">All Components</a></Link></li>
                                <li><Link to="/CreateComponent"><a className="dropdown-item">New Component</a></Link></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

    )
}

export default Navbar;