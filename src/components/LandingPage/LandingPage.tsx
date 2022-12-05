import React, { lazy } from "react";
import { useHistory } from "react-router-dom";
import "../../assets/css/LandingPage.css"

const Footer = lazy(()=> import("../../common/components/Footer"));
const Header = lazy(()=> import("../../common/components/Header"));


const LandingPage: React.FC = () => {
    let history = useHistory()
    function handleRegister() {
        history.push('/register')
    }
    return (

        <div className="container-fluid full-height" id="login-page">
            <Header />
            <div className='container-fluid' id="content-landingpage">
                <div className="row">
                    <div className="col-lg-6 col-sm-6">
                        <div className='text' style={{
                            marginLeft:' 85px',
                            marginTop: '150px',
                        }}>
                            <h1 className='header-landingpage' style={{
                                color: '#EBD510',
                                fontSize: '40px',
                            }}>KidsDrawing</h1>
                            <h2 className='description' style={{
                                color: '#ffffff',
                                fontSize: '40px'
                            }}>Ươm mầm ước mơ của bé</h2>
                            <button className="btn btn-primary btn-sigup-landingpage my-2 my-sm-0" onClick={() => {handleRegister()}}>Đăng kí ngay</button>
                        </div>
                    </div>
                    <div className="col-lg-6 col-sm-6 text-center">
                        <div className='slide-bar'>
                            <img src="https://res.cloudinary.com/djtmwajiu/image/upload/v1667290306/o0ymcs4lblpy2hfmisyq.png" alt="First slide" />
                        </div>
                    </div>
                </div>

            </div>
            <Footer />
        </div>
    );
};

export default LandingPage;
