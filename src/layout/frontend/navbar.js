import axios from "axios";
import React from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import logo from '../../assets/admin/assets/img/logo.png';

function Navbar() {

    const history = useHistory();
    const logoutSubmit = (e) => {
        e.preventDefault();
        axios.post('/api/logout').then(res => {
            if(res.data.status === 200)
            {
                localStorage.removeItem('auth_token');
                localStorage.removeItem('auth_name');
                swal("Success", res.data.message, "success");
                history.push('/');
            }
        });
    }

    var AuthButtons = '';
    if (!localStorage.getItem('auth_token')) {
        AuthButtons = (
            <ul className="nav-item">
                <li className="nav-item">
                    <Link className="nav-link" to="/login">Login</Link>
                </li>
            </ul>
        );
    }
    else {
        AuthButtons = (
            <ul className="navbar-nav mx-auto">
                <li className="nav-item">
                    <Link className="nav-link" to="#">PLANNING TOOL</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="#">SUPPLIERS</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="#">ADVICE & IDEAS</Link>
                </li>
                <li className="nav-item">
                    <button type="button" onClick={logoutSubmit} className="ml-2 nav-link btn btn-outline-primary">Logout</button>
                </li>
            </ul>
        );
    }

    return (
        <nav className="navbar navbar-dark bg-dark navbar-expand-lg shadow sticky-top">
            <div className="container-fluid">
                <img style={{
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    width: "60px",
                    height: "50px",
                    marginRight: 20,
                    marginLeft: 20
                }} src={logo} />
                <Link className="navbar-brand" to="#">WEDDING PLANNING</Link>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mx-auto">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="#">OFFERS</Link>
                        </li>
                        {AuthButtons}
                    </ul>
                </div>

            </div>
        </nav>
    );
}
export default Navbar;