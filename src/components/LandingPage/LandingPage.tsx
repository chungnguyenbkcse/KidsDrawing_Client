import React from "react";
//import { OnChangeModel } from "../../common/types/Form.types";
//import { useDispatch } from "react-redux";
//import { login } from "../../store/actions/account.actions";
//import TextInput from "../../common/components/TextInput";
import "../../assets/css/LandingPage.css"
import Header from "../../common/components/Header";
import Footer from "../../common/components/Footer";

const LandingPage: React.FC = () => {

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
                            <button className="btn btn-primary btn-sigup-landingpage my-2 my-sm-0" >Đăng kí ngay</button>
                        </div>
                    </div>
                    <div className="col-lg-6 col-sm-6 text-center">
                        <div className='slide-bar'>
                            <img src="https://res.cloudinary.com/djtmwajiu/image/upload/v1653726835/yfzr51aot4uof2awbush.png" alt="First slide" />
                        </div>
                    </div>
                </div>

            </div>
            <Footer />
        </div>
    );
};

export default LandingPage;
