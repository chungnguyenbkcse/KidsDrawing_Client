import React, { Dispatch, Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TopCard from "../../common/components/TopCardUser";
import { IRootPageStateType, IStateType, IStudentLeaveState, ITeacherLeaveState } from "../../store/models/root.interface";
import "./RequestTeacher.css"
import { updateCurrentPath } from "../../store/actions/root.actions";
import { logout } from "../../store/actions/account.actions";
import jwt_decode from "jwt-decode";
import { getStudentLeaveByTeacher } from "../../common/service/StudentLeave/GetStudentLeaveByTeacher";
import { toast, ToastContainer } from "react-toastify";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import Loading from "../../common/components/Loading";
import StudentLeaveList from "./StudentLeaveList1";
import { IStudentLeave, StudentLeaveModificationStatus } from "../../store/models/student_leave.interface";
import Popup from "reactjs-popup";
import { putStudentLeaveStatus } from "../../common/service/StudentLeave/PutStudentLeave";
import { changeSelectedStudentLeaveNotApproved, changeSelectedStudentLeaveNotApprovedNow, clearSelectedStudentLeaveNotApproved, setModificationState } from "../../store/actions/student_leave.action";

const RequestTeacher: React.FC = () => {
    const dispatch: Dispatch<any> = useDispatch();
    const student_leaves: IStudentLeaveState = useSelector((state: IStateType) => state.student_leaves);
    const teacher_leaves: ITeacherLeaveState = useSelector((state: IStateType) => state.teacher_leaves);
    console.log(student_leaves)
    console.log(teacher_leaves)
    const { promiseInProgress } = usePromiseTracker();
    const path: IRootPageStateType = useSelector((state: IStateType) => state.root.page);
    const numberTeacherRegisterSuccessfullCount: number = student_leaves.leaves.length;
    var id_x = localStorage.getItem('id');
    var id: number = 0;
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
                    trackPromise(getStudentLeaveByTeacher(dispatch, id))
                }
            }
            else {
                trackPromise(getStudentLeaveByTeacher(dispatch, id))
            }
        }

    }, [dispatch, access_token, refresh_token, id]);

    useEffect(() => {
        dispatch(updateCurrentPath("Yêu cầu", "Học sinh"));
    }, [path.area, dispatch])

    const [popup, setPopup] = useState(false);

    function onStudentLeaveRemove() {
        setPopup(true);
    }

    function onRemovePopup(value: boolean) {
        setPopup(false);
    }

    const handleStudentLeave = (student_leave: IStudentLeave, status: string) => {
        const id = toast.loading("Đang xác thực. Vui lòng đợi giây lát...", {
            position: toast.POSITION.TOP_CENTER
        });
        dispatch(putStudentLeaveStatus(student_leave.id, {
            status: status
        }, id))

    }

    function onStudentLeaveSelect(lesson: IStudentLeave): void {
        dispatch(changeSelectedStudentLeaveNotApprovedNow(lesson));
        setPopup(true)
        dispatch(setModificationState(StudentLeaveModificationStatus.None));
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
                {/* <h1 className="h3 mb-2 text-gray-800" id="home-teacher">Trang chủ</h1> */}
                {/* <p className="mb-4">Summary and overview of our admin stuff here</p> */}
                <ToastContainer />
                <div className="row">
                    <TopCard title="SỐ YÊU CẦU NGHỈ HỌC" text={`${numberTeacherRegisterSuccessfullCount}`} icon="book" class="primary" />
                    {/* <div className="col-xl-6 col-md-4 mb-4" id="content-button-create-teacher-level">
                    <button className="btn btn-success btn-green" id="btn-create-teacher-level" onClick={() =>
                    dispatch(setModificationState(TeacherRegisterQuantificationModificationStatus.Create))}>
                        <i className="fas fa fa-plus"></i>
                        Đăng kí trình độ
                    </button>
                </div> */}
                </div>

                {
                    function () {
                        if ((student_leaves.selectedStudentLeave) && (student_leaves.modificationState === StudentLeaveModificationStatus.Remove)) {
                            return (
                                <Popup
                                    open={popup}
                                    onClose={() => setPopup(false)}
                                    closeOnDocumentClick
                                >
                                    <div className="popup-modal" id="popup-modal">
                                        <div className="popup-title">
                                            Are you sure?
                                        </div>
                                        <div className="popup-content">
                                            <button type="button"
                                                className="btn btn-danger"
                                                onClick={() => {
                                                    if (!student_leaves.selectedStudentLeave) {
                                                        return;
                                                    }
                                                    handleStudentLeave(student_leaves.selectedStudentLeave, "Not approved")
                                                    dispatch(clearSelectedStudentLeaveNotApproved())
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
                    <div className="col-xl-12 col-lg-12">
                        <div className="card shadow mb-4" id="topcard-user">
                            <div className="card-header py-3">
                                <h6 className="m-0 font-weight-bold text-green" id="level-teacher">Danh sách yêu cầu nghỉ học</h6>
                            </div>
                            <div className="card-body">
                                <StudentLeaveList onSelect={onStudentLeaveSelect}/>
                            </div>
                        </div>
                    </div>
                </div>


            </Fragment>
    );
};

export default RequestTeacher;
