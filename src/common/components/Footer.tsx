import React from "react";

const Footer: React.FC = () => {
    return (
        <div className="footer">
            <footer className="page-footer font-small blue pt-4">

                <div className="container-fluid text-center text-md-left">

                    <div className="row">

                        <div className="col-md-3 mt-md-0 mt-3">

                            <h5 style={{
                                color: "#EBD510"
                            }}>KidsDrawing</h5>
                            <p style={{
                                color: "#ffffff"
                            }}>Hệ thống dạy vẽ tranh trực tuyến cho trẻ.
                                Với sứ mệnh mang niềm đam mê vẽ tranh
                                đến với các bé.</p>

                        </div>

                        <hr className="clearfix w-100 d-md-none pb-3" />

                        <div className="col-md-3 mb-md-0 mb-3">

                            <h6 style={{
                                color: "#F2F2F2"
                            }}>Số điện thoại</h6>

                            <ul className="list-unstyled">
                                <li>
                                    <p style={{
                                        color: "#ffffff"
                                    }}>+084 989439678</p>
                                </li>
                            </ul>

                        </div>

                        <div className="col-md-3 mb-md-0 mb-3">

                            <h6 style={{
                                color: "#F2F2F2"
                            }}>Email</h6>

                            <ul className="list-unstyled">
                                <li>
                                    <p style={{
                                        color: "#ffffff"
                                    }}>kidsdrawing@gmail.com</p>
                                </li>
                            </ul>

                        </div>

                        <div className="col-md-3 mb-md-0 mb-3">

                            <h6 style={{
                                color: "#F2F2F2"
                            }}>Địa chỉ</h6>

                            <ul className="list-unstyled">
                                <li>
                                    <p style={{
                                        color: "#ffffff"
                                    }}>Quảng Chính, Quảng Xương, Thanh Hóa</p>
                                </li>
                            </ul>

                        </div>

                    </div>

                </div>

                <div className="footer-copyright text-center py-3" style={{
                    color: "#ffffff"
                }}>© 2020 Copyright:
                    <a href="/"> MDBootstrap.com</a>
                </div>

            </footer>
        </div>
    )
}

export default Footer;