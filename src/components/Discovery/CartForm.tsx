import React, { Dispatch, Fragment, useEffect, useState } from "react";
import "./SemesterClassDetail.css"
import { toast, ToastContainer } from "react-toastify";
import { GrLinkNext } from "react-icons/gr";
import { ILessonState, IRootPageStateType, IStateType, IUserRegisterJoinSemesterState } from "../../store/models/root.interface";
import { useDispatch, useSelector } from "react-redux";
import { postMomo } from "../../common/service/Payment/PostPayment";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import Loading from "../../common/components/Loading";
import jwt_decode from "jwt-decode";
import { logout } from "../../store/actions/account.actions";
import { updateCurrentPath } from "../../store/actions/root.actions";
import { getUserRegisterJoinSemesterByPayer } from "../../common/service/UserRegisterJoinSemester/GetUserRegisterJoinSemesterByPayer";
import { deleteUserRegisterJoinSemester1 } from "../../common/service/UserRegisterJoinSemester/DeleteUserRegisterJoinSemester";
import { getUserRegisterJoinSemesterByStudent } from "../../common/service/UserRegisterJoinSemester/GetUserRegisterJoinSemesterStudent";
import { LessonModificationStatus } from "../../store/models/lesson.interface";
import Popup from "reactjs-popup";
import { setModificationState } from "../../store/actions/lesson.action";


const CartForm: React.FC = () => {
    const dispatch: Dispatch<any> = useDispatch();
    const path: IRootPageStateType = useSelector((state: IStateType) => state.root.page);
    const user_register_join_semesters: IUserRegisterJoinSemesterState = useSelector((state: IStateType) => state.user_register_join_semesters);
    var id_x = localStorage.getItem('id');
    let id: number = 0;
    if (id_x !== null) {
        id = parseInt(id_x);
    }
    

    const lessons: ILessonState = useSelector((state: IStateType) => state.lessons);

    const [popup, setPopup] = useState(false);
    const [cardId, setCardId] = useState(0)


    function onLessonRemove() {
        setPopup(true);
    }

    function onRemovePopup(value: boolean) {
        setPopup(false);
    }

    var role = localStorage.getItem('role')
    var rolePrivilege: string[] = []
    var roleUser: string = ""
    if (role !== null) {
        rolePrivilege = role.split(',')
        roleUser = rolePrivilege[0]
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
                    localStorage.removeItem('role')
                    localStorage.removeItem('id')
                    localStorage.removeItem('contest_id')
                    localStorage.removeItem('schedule_id')
                    dispatch(logout())
                }
                else {
                    if (roleUser === "PARENT") {
                        trackPromise(getUserRegisterJoinSemesterByPayer(dispatch, id))
                    }else {
                        trackPromise(getUserRegisterJoinSemesterByStudent(dispatch, id))
                    }
                }
            }
            else {
                if (roleUser === "PARENT") {
                    trackPromise(getUserRegisterJoinSemesterByPayer(dispatch, id))
                }else {
                    trackPromise(getUserRegisterJoinSemesterByStudent(dispatch, id))
                }
            }
        }
        
    }, [dispatch, id, access_token, refresh_token, roleUser]);

    useEffect(() => {
        dispatch(updateCurrentPath("Giỏ hàng", ""));
    }, [path.area, dispatch])
    
    function handlePayment() {
        let ids: string[] = []; 
        user_register_join_semesters.waiting.map((ele, idx) => {
            return ids.push(ele.id)
        })
        console.log("ids", ids)
        const idx = toast.loading("Đang xử lý. Vui lòng đợi giây lát...", {
            position: toast.POSITION.TOP_CENTER
        });
        postMomo(user_register_join_semesters.waiting.reduce((prev, next) => prev + ((next.price * 1) || 0), 0), ids, idx);
    }

    if (roleUser === "PARENT") {
        return (
            promiseInProgress ?
          <div className="loader"></div> : <Fragment>
                <ToastContainer />
                {
                    function () {
                        if (lessons.modificationState === LessonModificationStatus.Remove) {
                            return (
                                <Popup
                                open={popup}
                                onClose={() => setPopup(false)}
                                closeOnDocumentClick
                            >
                                <div className="popup-modal" id="popup-modal">
                                    <div className="popup-title">
                                        Bạn có chắc chắn muốn xóa?
                                    </div>
                                    <div className="popup-content">
                                        <button type="button"
                                            className="btn btn-danger"
                                            onClick={() => {
                                                const idx = toast.loading("Đang xử lý. Vui lòng đợi giây lát...", {
                                                    position: toast.POSITION.TOP_CENTER
                                                  });
                                                  var id_xy = localStorage.getItem('user_register_join_semester_id');
                                                  var user_register_join_semester_id: number = 0;
                                                  if (id_xy !== null) {
                                                    user_register_join_semester_id = parseInt(id_xy);
                                                  }
                                                dispatch(deleteUserRegisterJoinSemester1(user_register_join_semester_id, idx))
                                                setPopup(false);
                                            }}>Remove
                                        </button>
                                    </div>
                                </div>
                            </Popup>
                            )
                        }
                    }()
                }
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
                                <td><i className="badge badge-danger" onClick={()=>{
                                    setCardId(item.id)
                                    localStorage.removeItem('user_register_join_semester_id')
                                    localStorage.setItem('user_register_join_semester_id', item.id.toString())
                                    console.log(item.id)
                                    dispatch(setModificationState(LessonModificationStatus.Remove))
                                    setPopup(true)
                                }}>X</i></td>
                                <td>{item.course_name}</td>
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
                        <td>{user_register_join_semesters.waiting.reduce((prev, next) => prev + ((next.price * 1) || 0), 0)} VNĐ</td>
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
    }
    else {
        return (
            promiseInProgress ?
          <div className="loader"></div> : <Fragment>
                <ToastContainer />
                {
                    function () {
                        if (lessons.modificationState === LessonModificationStatus.Remove) {
                            return (
                                <Popup
                                open={popup}
                                onClose={() => setPopup(false)}
                                closeOnDocumentClick
                            >
                                <div className="popup-modal" id="popup-modal">
                                    <div className="popup-title">
                                        Bạn có chắc chắn muốn xóa?
                                    </div>
                                    <div className="popup-content">
                                        <button type="button"
                                            className="btn btn-danger"
                                            onClick={() => {
                                                const idx = toast.loading("Đang xử lý. Vui lòng đợi giây lát...", {
                                                    position: toast.POSITION.TOP_CENTER
                                                  });
                                                  var id_xy = localStorage.getItem('user_register_join_semester_id');
                                                  var user_register_join_semester_id: number = 0;
                                                  if (id_xy !== null) {
                                                    user_register_join_semester_id = parseInt(id_xy);
                                                  }
                                                dispatch(deleteUserRegisterJoinSemester1(user_register_join_semester_id, idx))
                                                setPopup(false);
                                            }}>Remove
                                        </button>
                                    </div>
                                </div>
                            </Popup>
                            )
                        }
                    }()
                }
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
                                <td><i className="badge badge-danger" onClick={()=>{
                                    setCardId(item.id)
                                    console.log(item.id)
                                    localStorage.removeItem('user_register_join_semester_id')
                                    localStorage.setItem('user_register_join_semester_id', item.id.toString())
                                    dispatch(setModificationState(LessonModificationStatus.Remove))
                                    setPopup(true)
                                }}>X</i></td>
                                <td>{item.course_name}</td>
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
                        <td>{user_register_join_semesters.waiting.reduce((prev, next) => prev + ((next.price * 1) || 0), 0)} VNĐ</td>
                    </tr>
                    </tbody>
                   
                </table>
                </div>
            </div>
    
    
            </Fragment >
        );
    }
};

export default CartForm;
