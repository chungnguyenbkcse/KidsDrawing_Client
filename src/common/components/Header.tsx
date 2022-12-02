import React from "react";
import { useHistory } from "react-router-dom";
import '../../assets/css/Header.css'

const Header: React.FC = () => {
    let history = useHistory()
    function handlerStart() {
        history.push('/auth')
    }

    function handleRegister() {
        history.push('/register')
    }
    return (
        <div className="header">
            <nav className="navbar navbar-expand-lg navbar-light">
                <a className="navbar-brand text-logo" href="/" style={{
                    color: "#EBD510",
                    fontSize: '28px'
                }}>KidsDrawing</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item" style={{
                            marginRight: "10px"
                        }}>
                            <button className="btn btn-sigup my-2 my-sm-0" id='btn-sigup-langdingpage' style={{
                                backgroundColor: "#5A47AB",
                                border: '1px solid #F2F2F2',
                                color: "#ffffff",
                                fontWeight: "bold",
                            }} onClick={() => {handleRegister()}}>Đăng kí</button>
                        </li>
                        <li className="nav-item" style={{
                            marginRight: "10px"
                        }}>
                            <button className="btn btn-sigin my-2 my-sm-0" id='btn-sigin-landingpage' style={{
                                backgroundColor: "#F2F2F2",
                                color: "#5A47AB",
                                fontWeight: "bold"
                            }} onClick={() => handlerStart()}>Đăng nhập</button>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default Header;
