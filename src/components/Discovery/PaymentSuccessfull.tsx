import React, { Dispatch, Fragment, useEffect } from "react";
import { useDispatch } from "react-redux";
import { postStatusUserRegisterJoinSemester } from "../../common/service/UserRegisterJoinSemester/PostStatusUserRegisterJoinSemester";

import "./PaymentSuccessfull.css"


const PaymentSuccessfull: React.FC = () => {
    const dispatch: Dispatch<any> = useDispatch();
    
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    const ids = urlParams.get('ids')
    console.log(ids);

    useEffect(() => {
        dispatch(postStatusUserRegisterJoinSemester(ids))
    }, [dispatch, ids])

    return (
        <Fragment>

            <div className="container">
                <div className="row">
                    <div className="col-md-6 mx-auto mt-5">
                        <div className="payment">
                            <div className="payment_header">
                                <div className="check"><i className="fa fa-check" aria-hidden="true"></i></div>
                            </div>
                            <div className="content">
                                <h1>Thanh toán thành công !</h1>
                                <p>Chúc mừng bạn đã thanh toán thành công đơn hàng. Vui lòng lòng quay lại trang chủ để trải nghiệm!</p>
                                <a href="/Home">Go to Home</a>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default PaymentSuccessfull;
