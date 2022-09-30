import React, { Dispatch, Fragment, useEffect } from "react";
import "./SemesterClassDetail.css"
import { ToastContainer } from "react-toastify";
import { GrLinkNext } from "react-icons/gr";
import { IRootPageStateType, IStateType, IUserRegisterJoinSemesterState } from "../../store/models/root.interface";
import { useDispatch, useSelector } from "react-redux";
import {removeCart } from "../../store/actions/cart.action";
import { postMomo } from "../../common/service/Payment/PostPayment";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import Loading from "../../common/components/Loading";
import jwt_decode from "jwt-decode";
import { logout } from "../../store/actions/account.actions";
import { updateCurrentPath } from "../../store/actions/root.actions";
import { getUserRegisterJoinSemesterByPayer } from "../../common/service/UserRegisterJoinSemester/GetUserRegisterJoinSemesterByPayer";


const CartForm: React.FC = () => {
    const dispatch: Dispatch<any> = useDispatch();
    const path: IRootPageStateType = useSelector((state: IStateType) => state.root.page);
    const user_register_join_semesters: IUserRegisterJoinSemesterState = useSelector((state: IStateType) => state.user_register_join_semesters);
    var id_x = localStorage.getItem('id');
    let id: string = "";
    if (id_x !== null) {
        id = id_x;
    }

    const { promiseInProgress } = usePromiseTracker();

    let access_token = localStorage.getItem("access_token");
    let refresh_token = localStorage.getItem("refresh_token");
    useEffect(() => {
        if (access_token !== null && refresh_token !== null && access_token !== undefined && refresh_token !== undefined){
            let access_token_decode: any = jwt_decode(access_token)
            let refresh_token_decode: any = jwt_decode(refresh_token)
            let exp_access_token_decode = access_token_decode.exp;
            let exp_refresh_token_decode = refresh_token_decode.exp;
            let now_time = Date.now() / 1000;
            console.log(exp_access_token_decode)
            console.log(now_time)
            if (exp_access_token_decode < now_time){
                if (exp_refresh_token_decode < now_time){
                    localStorage.removeItem('access_token') // Authorization
                    localStorage.removeItem('refresh_token')
                    localStorage.removeItem('username')
                    localStorage.removeItem('role_privilege')
                    localStorage.removeItem('id')
                    localStorage.removeItem('contest_id')
                    localStorage.removeItem('schedule_id')
                    dispatch(logout())
                }
                else {
                    trackPromise(getUserRegisterJoinSemesterByPayer(dispatch, id))
                }
            }
            else {
                trackPromise(getUserRegisterJoinSemesterByPayer(dispatch, id))
            }
        }
        dispatch(updateCurrentPath("Giỏ hàng", ""));
    }, [path.area, dispatch, id, access_token, refresh_token]);
    
    function handlePayment() {
        let ids: string[] = []; 
        user_register_join_semesters.waiting.map((ele, idx) => {
            return ids.push(ele.id)
        })
        console.log("ids", ids)
        postMomo(user_register_join_semesters.waiting.reduce((prev, next) => prev + ((next.price * 1) || 0), 0), ids);
    }

    return (
        promiseInProgress ?
      <div className="row" id="search-box">
        <div className="col-xl-12 col-lg-12">
          <div className="input-group" id="search-content">
            <div className="form-outline">
              <Loading type={"spin"} color={"rgb(53, 126, 221)"} />
            </div>
          </div>
        </div>
      </div> : <Fragment>
            <ToastContainer />
            <div className="row">
            <div className="col-md-12">
            <table className="table">
                <thead>
                    <tr>
                        <th></th>
                        <th>Tên</th>
                        <th>Ảnh</th>
                        <th>Bé</th>
                        <th>Gía</th>
                        <th>Số lượng</th>
                        <th>Tiền</th>
                    </tr>
                </thead>
                <tbody>
                {
                    user_register_join_semesters.waiting.map((item,key)=>{
                        return(
                            <tr key={key}>   
                            <td><i className="badge badge-danger" onClick={()=>{dispatch(removeCart(item.id))}}>X</i></td>
                            <td>{item.semester_class_name}</td>
                            <td><img src={item.link_url} style={{width:'100px',height:'80px'}} alt="" /></td>
                            <td>{item.student_name}</td>
                            <td>{item.price} VND</td>
                            <td>
                                    <span className="btn btn-info">1</span>
                            </td>
                            <td>{item.price * 1} VND</td>
                        </tr>
                        )
                    })
                         
                }
                <tr>
                    <td colSpan={5}>Tổng tiền</td>
                    <td>{user_register_join_semesters.waiting.reduce((prev, next) => prev + ((next.price * 1) || 0), 0)} $</td>
                </tr>
                <tr>
                    <td colSpan={5}></td>
                    <td>
                        <button className="btn btn-success btn-green" id="btn-create-register-course3" onClick={() => {handlePayment()}}>
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
