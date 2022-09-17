import React, { Fragment, Dispatch, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IStateType, IRootPageStateType, IUserState } from "../../store/models/root.interface";
import { updateCurrentPath } from "../../store/actions/root.actions";
import { useHistory, useLocation } from "react-router-dom";
import "./SemesterClassDetail.css"
import { IUser } from "../../store/models/user.interface";
import ReactSelect from "../../common/components/ReactSelect";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import Loading from "../../common/components/Loading";
import { logout } from "../../store/actions/account.actions";
import { getSemesterClassNew } from "../../common/service/SemesterClass/GetSemesterNew";
import { getStudentByParent } from "../../common/service/Student/GetStudentByParent";
import jwt_decode from "jwt-decode";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { GrLinkNext } from "react-icons/gr";
import { addCart } from "../../store/actions/cart.action";
import { toast, ToastContainer } from "react-toastify";

type Option1 = {
    label: string;
    value: number;
}

const SemesterClassDetail: React.FC = () => {
    const dispatch: Dispatch<any> = useDispatch();
    const path: IRootPageStateType = useSelector((state: IStateType) => state.root.page);

    const users: IUserState = useSelector((state: IStateType) => state.users);
    const listTeacher: IUser[] = users.students
    const listTeachers: Option1[] = [];
    listTeacher.map((ele) => {
      let item: Option1 = { "label": ele.username, "value": ele.id }
      return listTeachers.push(item)
    })

    var id_x = localStorage.getItem('id');
    var id: number = 2;
    if (id_x !== null) {
        id = parseInt(id_x);
    }

    const { state } = useLocation<any>();
    console.log(state)

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
                    trackPromise(getSemesterClassNew(dispatch))
                    trackPromise(getStudentByParent(dispatch, id))
                }
            }
            else {
                trackPromise(getSemesterClassNew(dispatch))
                trackPromise(getStudentByParent(dispatch, id))
            }
        }
        dispatch(updateCurrentPath("Lớp", ""));
    }, [path.area, dispatch, id, access_token, refresh_token]);

    function handleRegister() {
        valueTeacher.map((ele, idx) => {
            console.log({
                id: state.semester_class_id,
                name: state.semester_class_name,
                image: state.image_url,
                quantity: 1,
                price: state.price
            })
            return dispatch(addCart({
                id: state.semester_class_id,
                name: state.semester_class_name,
                image: state.image_url,
                quantity: 1,
                price: state.price
            }))
        })

        toast.success("Thêm giỏ hàng thành công...", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000
          })
    }

    const history = useHistory();
    function handleRegister1() {
        valueTeacher.map((ele, idx) => {
            console.log({
                id: state.semester_class_id,
                name: state.semester_class_name,
                image: state.image_url,
                quantity: 1,
                price: state.price
            })
            return dispatch(addCart({
                id: state.semester_class_id,
                name: state.semester_class_name,
                image: state.image_url,
                quantity: 1,
                price: state.price
            }))
        })
        let path = '/cart'; 
        history.push({
            pathname: path
        });
    }

    const [valueTeacher, setValueTeacher] = useState<any[]>([])

    console.log(valueTeacher)

    function changeValueTeacher(value: any){
      setValueTeacher(value)
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
            <div className="col-xl-12 col-lg-12">
                <div className="card shadow mb-4">
                    {
                        function () {
                            if (state === undefined || state === null) {
                                return ""
                            }
                            else {
                                console.log(state)
                                return <div className="card-body" dangerouslySetInnerHTML={{ __html: state.description }}>
                                </div>
                            }
                        }()
                    }
                    <div className="row">
                        <div className="form-group col-md-6 ml-2">
                            <label>Bé</label>
                            <ReactSelect setValue={listTeachers} value={[]} changeValue={changeValueTeacher}/>
                        </div>
                    </div>
                    <div className="row" id="btn-register-course">
                        <div className="col-lg-6 col-md-6 col-xs-6 text-center justify-content-center">
                        <button className="btn btn-success btn-green" id="btn-create-register-course1" onClick={() => handleRegister()}>
                        <AiOutlineShoppingCart />
                        Thêm vào giỏ hàng
                    </button>
                        </div>
                        <div className="col-lg-6 col-md-6 col-xs-6 text-center justify-content-center">
                        <button className="btn btn-success btn-green" id="btn-create-register-course2" onClick={() => handleRegister1()}>
                        <GrLinkNext id="btn-payment" color="#ffffff"/>
                        Thanh toán ngay
                    </button>
                        </div>           
                </div>
                </div>
            </div>

        </Fragment >
    );
};

export default SemesterClassDetail;
