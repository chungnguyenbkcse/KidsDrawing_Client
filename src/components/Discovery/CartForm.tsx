import React, { Dispatch, Fragment } from "react";
import "./SemesterClassDetail.css"
import { ToastContainer } from "react-toastify";
import { GrLinkNext } from "react-icons/gr";
import { ICartState, IStateType } from "../../store/models/root.interface";
import { useDispatch, useSelector } from "react-redux";
import { decreaseQuantiry, increaseQuantiry, removeCart } from "../../store/actions/cart.action";


const CartForm: React.FC = () => {
    const dispatch: Dispatch<any> = useDispatch();
    const carts: ICartState = useSelector((state: IStateType) => state.carts);
    console.log(carts.carts)

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
                            <td>{item.price} $</td>
                            <td>
                                    <span className="btn btn-primary" style={{margin:'2px'}} onClick={()=>{dispatch(decreaseQuantiry(item.id))}}>-</span>
                                    <span className="btn btn-info">{item.quantity}</span>
                                    <span className="btn btn-primary" style={{margin:'2px'}} onClick={()=>{dispatch(increaseQuantiry(item.id))}}>+</span>
                            </td>
                            <td>{item.price * item.quantity} $</td>
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
                        <button className="btn btn-success btn-green" id="btn-create-register-course3" onClick={() => {}}>
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
