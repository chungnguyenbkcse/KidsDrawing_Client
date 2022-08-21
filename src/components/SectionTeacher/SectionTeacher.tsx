import jwt_decode from "jwt-decode";
import jwtDecode from "jwt-decode";
import React, { Dispatch, Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { ChartLine } from "../../common/components/CharLine";
import TopCard from "../../common/components/TopCardUser";
import { getTeacherRegisterQuantificationByTeacherId } from "../../common/service/TeacherRegisterQuantification/GetTeacherRegisterQuantificationByTeacherId";
import { getUserById } from "../../common/service/User/GetUserById";
import { logout } from "../../store/actions/account.actions";
import { changeSelectedTeacherRegisterQuatificationApproved, clearSelectedTeacherRegisterQuatification, setModificationState } from "../../store/actions/teacher_register_quantification.action";
import { IRootPageStateType, IStateType, ITeacherRegisterQuantificationState, IUserState } from "../../store/models/root.interface";
import { ITeacherRegisterQuantification, TeacherRegisterQuantificationModificationStatus } from "../../store/models/teacher_register_quantification.interface";
import "./SectionTeacher.css"

const SectionTeacher: React.FC = () => {
    const dispatch: Dispatch<any> = useDispatch();
    const teacherRegisterQuantifications: ITeacherRegisterQuantificationState = useSelector((state: IStateType) => state.teacher_register_quantifications);
    const users: IUserState = useSelector((state: IStateType) => state.users);
    console.log(users.teachers)
    console.log(teacherRegisterQuantifications)
    const path: IRootPageStateType = useSelector((state: IStateType) => state.root.page);
    const numberApprovedCount: number = teacherRegisterQuantifications.approveds.length;
    const numberNotApprovedNowCount: number = teacherRegisterQuantifications.not_approved_now.length;
    const [popup, setPopup] = useState(false);
    var id_x = localStorage.getItem('id');
    var id: number = 2;
    if (id_x !== null) {
        id = parseInt(id_x);
    }
    let access_token = localStorage.getItem("access_token");
    let refresh_token = localStorage.getItem("refresh_token");
    useEffect(() => {
        if (access_token !== null && refresh_token !== null && access_token !== undefined && refresh_token !== undefined) {
            let access_token_decode: any = jwt_decode(access_token)
            let refresh_token_decode: any = jwt_decode(refresh_token)
            let exp_access_token_decode = access_token_decode.exp;
            let exp_refresh_token_decode = refresh_token_decode.exp;
            let now_time = Date.now() / 1000;
            console.log(exp_access_token_decode)
            console.log(now_time)
            if (exp_access_token_decode < now_time) {
                if (exp_refresh_token_decode < now_time) {
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
                    dispatch(clearSelectedTeacherRegisterQuatification());
                    dispatch(getTeacherRegisterQuantificationByTeacherId(id))
                    dispatch(getUserById(id))
                }
            }
            else {
                dispatch(clearSelectedTeacherRegisterQuatification());
                dispatch(getTeacherRegisterQuantificationByTeacherId(id))
                dispatch(getUserById(id))
            }
        }
    }, [dispatch, access_token, refresh_token]);

    function onTeacherRegisterQuantificationSelect(teacherRegisterQuantification: ITeacherRegisterQuantification): void {
        dispatch(changeSelectedTeacherRegisterQuatificationApproved(teacherRegisterQuantification));
        dispatch(setModificationState(TeacherRegisterQuantificationModificationStatus.None));
    }

    function onTeacherRegisterQuantificationRemove() {
        if (teacherRegisterQuantifications.selectedTeacherRegisterQuantification) {
            setPopup(true);
        }
    }

    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    const data = {
        labels,
        datasets: [
            {
                label: 'Dataset 1',
                data: [1, 2, 3, 4, 5, 6],
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: 'Dataset 2',
                data: [1, 2, 3, 4, 5, 6],
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };

    const history = useHistory();
    const routeChange2 = () =>{ 
        let path = '/section/view'; 
        history.push({
            pathname: path
        });
    }

    const onChangeRoute1 = () => {
        let path = "/section/edit";
        history.push({
            pathname: path
        })
    }
    
    return (
        <Fragment>
            <div className="row mb-2">
                <div className="col-xl-6 col-md-6 col-xs-6 md-4 ">
                    <button 
                        className="btn btn-success ml-3" 
                        id="btn-edit-tutorial" 
                        onClick={onChangeRoute1}
                    >
                        <i className="fas fa-edit"></i>
                        Chỉnh giáo án
                    </button>
                </div>

                <div className="col-xl-6 col-md-6 col-xs-6 md-4">
                    <button 
                        className="btn btn-success ml-3" 
                        id="btn-add-exercise" 
                        onClick={() => {}}
                    >
                        <i className="fas fa fa-plus"></i>
                        Thêm bài tập
                    </button>
                </div>
            </div>
            <div className="row">
                <div className="col-xl-6 col-md-6 mb-4">
                    <div className="row">
                        <div className="col-xl-12 col-md-12 mb-4">
                            <div className="col-xl-12 col-md-12 mb-4">
                                <div className={`card shadow h-100 py-2`} id="normal-tutorial">
                                    <div className="card-body">
                                        <div className="row no-gutters justify-content-left">
                                            <h4 id="full-name">Giáo án chung</h4>
                                        </div>
                                        <div className="row no-gutters">
                                            <p id="phone">Tên: Giới thiệu</p>
                                        </div>

                                        <div className="row no-gutters">
                                            <p id="phone">Nội dung: </p>
                                        </div>

                                        <div className="row  justify-content-center">
                                            <button 
                                                className="btn btn-success ml-2" 
                                                id="btn-view-tutorial" 
                                                onClick={routeChange2}
                                            >                                           
                                                Xem nội dung
                                            </button>
                                        </div>

                                        <div className="row no-gutters">
                                            <p id="phone">Hình thức: Dạy thông qua jisti</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-xl-6 col-md-6 mb-4">
                    <div className="row">
                        <div className="col-xl-12 col-md-12 mb-4">
                            <div className="col-xl-12 col-md-12 mb-4">
                                <div className={`card shadow h-100 py-2`} id="normal-tutorial">
                                    <div className="card-body">
                                        <div className="row no-gutters justify-content-left">
                                            <h4 id="full-name">Bài tập</h4>
                                        </div>
                                        <div className="row no-gutters">
                                            <div className="col-xl-4 col-md-4 col-xs-4 mb-4">
                                                <img className="card-img image-exercise"  src="https://res.cloudinary.com/djtmwajiu/image/upload/v1661088283/exam1_clcq5z.png" alt="Card image cap" />
                                            </div>
                                            <div className="col-xl-8 col-md-8 col-xs-8 mb-4">
                                                <h3 className=" mb-2" id="level-teacher">Bài tập 1</h3>
                                                <h4 className=" mb-2" id="level-teacher">Vẽ con mèo</h4>
                                            </div>
                                        </div>

                                        <div className="row no-gutters">
                                            <div className="col-xl-4 col-md-4 col-xs-4 mb-4">
                                                <img className="card-img image-exercise" src="https://res.cloudinary.com/djtmwajiu/image/upload/v1661088283/exam1_clcq5z.png" alt="Card image cap" />
                                            </div>
                                            <div className="col-xl-8 col-md-8 col-xs-8 mb-4">
                                                <h3 className=" mb-2" id="level-teacher">Bài tập 1</h3>
                                                <h4 className=" mb-2" id="level-teacher">Vẽ con mèo</h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </Fragment>
    );
};

export default SectionTeacher;
