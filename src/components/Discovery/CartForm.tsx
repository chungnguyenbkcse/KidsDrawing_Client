import React, { Fragment } from "react";
import "./SemesterClassDetail.css"
import { ToastContainer } from "react-toastify";
import { GrLinkNext } from "react-icons/gr";


const CartForm: React.FC = () => {

    let ListCart = [
        {
            name: 'Lớp mầm 1 năm học 2022',
            image: 'http://res.cloudinary.com/djtmwajiu/image/upload/v1662733660/cryfru6jqwfg6wsp00jq.jpg',
            price: 2000000,
            quantity: 2
        }
    ]
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
                    ListCart.map((item,key)=>{
                        return(
                            <tr key={key}>   
                            <td><i className="badge badge-danger" onClick={()=>{}}>X</i></td>
                            <td>{item.name}</td>
                            <td><img src={item.image} style={{width:'100px',height:'80px'}} alt="" /></td>
                            <td>{item.price} $</td>
                            <td>
                                    <span className="btn btn-primary" style={{margin:'2px'}} onClick={()=>{}}>-</span>
                                    <span className="btn btn-info">{item.quantity}</span>
                                    <span className="btn btn-primary" style={{margin:'2px'}} onClick={()=>{}}>+</span>
                            </td>
                            <td>100 $</td>
                        </tr>
                        )
                    })
                         
                }
                <tr>
                    <td colSpan={5}>Tổng tiền</td>
                    <td>100 $</td>
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
