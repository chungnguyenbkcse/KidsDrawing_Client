import React, { Dispatch, Fragment } from "react";
import "./SemesterClassDetail.css"
import { ToastContainer } from "react-toastify";
import { GrLinkNext } from "react-icons/gr";
import { ICartState, IStateType } from "../../store/models/root.interface";
import { useDispatch, useSelector } from "react-redux";
import {removeCart } from "../../store/actions/cart.action";
import { postMomo } from "../../common/service/Payment/PostPayment";


const CartForm: React.FC = () => {
    const dispatch: Dispatch<any> = useDispatch();
    const carts: ICartState = useSelector((state: IStateType) => state.carts);
    console.log(carts.carts)
    function handlePayment(total_price: number) {
        postMomo(total_price)
    }

    return (
        <Fragment>
            <ToastContainer />
            <div className="row">
            <div className="col-md-12">
            <table className="table">
                <thead>
                    <tr>
                        <th></th>
                        <th>Tên</th>
                        <th>Ảnh</th>
                        <th>Gía</th>
                        <th>Số lượng</th>
                        <th>Tiền</th>
                    </tr>
                </thead>
                <tbody>
                {
                    carts.carts.map((item,key)=>{
                        return(
                            <tr key={key}>   
                            <td><i className="badge badge-danger" onClick={()=>{dispatch(removeCart(item.id))}}>X</i></td>
                            <td>{item.name}</td>
                            <td><img src={item.image} style={{width:'100px',height:'80px'}} alt="" /></td>
                            <td>{item.price} VND</td>
                            <td>
                                    <span className="btn btn-info">{item.quantity}</span>
                            </td>
                            <td>{item.price * item.quantity} VND</td>
                        </tr>
                        )
                    })
                         
                }
                <tr>
                    <td colSpan={5}>Tổng tiền</td>
                    <td>{carts.carts.reduce((prev, next) => prev + ((next.price * next.quantity) || 0), 0)} $</td>
                </tr>
                <tr>
                    <td colSpan={5}></td>
                    <td>
                        <button className="btn btn-success btn-green" id="btn-create-register-course3" onClick={() => {handlePayment(carts.carts.reduce((prev, next) => prev + ((next.price * next.quantity) || 0), 0))}}>
                            <GrLinkNext id="btn-payment" color="#ffffff"/>
                            Thanh toán
                        </button>
                    </td>
                </tr>
                </tbody>
               
            </table>
            </div>
        </div>


        </Fragment >
    );
};

export default CartForm;
