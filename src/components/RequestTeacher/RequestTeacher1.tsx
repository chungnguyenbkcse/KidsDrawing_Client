import React, { Dispatch, Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TopCard from "../../common/components/TopCardUser";
import { IRootPageStateType, IStateType, IStudentLeaveState, ITeacherLeaveState } from "../../store/models/root.interface";
import "./RequestTeacher.css"
import { updateCurrentPath } from "../../store/actions/root.actions";
import { logout } from "../../store/actions/account.actions";
import jwt_decode from "jwt-decode";
import { getTeacherLeaveByTeacher } from "../../common/service/TeacherLeave/GetTeacherLeaveByTeacher";
import { toast, ToastContainer } from "react-toastify";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import Loading from "../../common/components/Loading";
import TeacherLeaveList from "./TeacherLeaveList1";
import { putTeacherLeaveStatus } from "../../common/service/TeacherLeave/PutTeacherLeave";
import { ITeacherLeave } from "../../store/models/teacher_leave.interface";
import { clearSelectedStudentLeaveNotApproved, setModificationState } from "../../store/actions/student_leave.action";
import { StudentLeaveModificationStatus } from "../../store/models/student_leave.interface";
import Popup from "reactjs-popup";
import TeacherLeaveApprovedList from "./TeacherLeaveApproved";

const RequestTeacher1: React.FC = () => {
    const dispatch: Dispatch<any> = useDispatch();
    const student_leaves: IStudentLeaveState = useSelector((state: IStateType) => state.student_leaves);
    const teacher_leaves: ITeacherLeaveState = useSelector((state: IStateType) => state.teacher_leaves);
    console.log(student_leaves)
    console.log(teacher_leaves)
    const { promiseInProgress } = usePromiseTracker();
    const path: IRootPageStateType = useSelector((state: IStateType) => state.root.page);
    const numberTeacherRegisterSuccessfullCount: number = teacher_leaves.acceptLeaves.length;
    const numberTeacherNotRegisterCount: number = teacher_leaves.leaves.filter((e) => e.status == "Not approve now" || e.status === "Admin approved").length;
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
                    localStorage.removeItem('role')
                    localStorage.removeItem('id')
                    localStorage.removeItem('contest_id')
                    localStorage.removeItem('schedule_id')
                    dispatch(logout())
                }
                else {
                    trackPromise(getTeacherLeaveByTeacher(dispatch, id))
                }
            }
            else {

                trackPromise(getTeacherLeaveByTeacher(dispatch, id))
            }
        }

    }, [dispatch, access_token, refresh_token, id]);

    useEffect(() => {
        dispatch(updateCurrentPath("Yêu cầu", "Giáo viên"));
    }, [path.area, dispatch])

    const [popup, setPopup] = useState(false);

    function onTeacherLeaveRemove() {
        setPopup(true);
    }

    function onRemovePopup(value: boolean) {
        setPopup(false);
    }

    const [teacherLeave, setTeacherLeave] = useState(0)

    function onTeacherLeaveSelect(idxx: number): void {
        setTeacherLeave(idxx)
        setPopup(true)
        dispatch(setModificationState(StudentLeaveModificationStatus.None));
    }

    const updateStatusTeacherLeave = (status: string) => {
        const idx = toast.loading("Đang xử lý. Vui lòng đợi giây lát...", {
            position: toast.POSITION.TOP_CENTER
        });

        (putTeacherLeaveStatus(dispatch, teacherLeave, {
            status: status
        }, idx))
    }

    const [checked, setChecked] = useState(true);


    return (
        promiseInProgress ?
            <div className="loader"></div> : <Fragment>

                {/* <h1 className="h3 mb-2 text-gray-800" id="home-teacher">Trang chủ</h1> */}
                {/* <p className="mb-4">Summary and overview of our admin stuff here</p> */}
                <ToastContainer />

                <div className="row">
                    <TopCard title="SỐ YÊU CẦU DẠY THAY" text={`${numberTeacherNotRegisterCount}`} icon="book" class="primary" />
                    <TopCard title="SỐ BUỔI DẠY THAY" text={`${numberTeacherRegisterSuccessfullCount}`} icon="book" class="primary" />
                    {/* <div className="col-xl-6 col-md-4 mb-4" id="content-button-create-teacher-level">
                    <button className="btn btn-success btn-green" id="btn-create-teacher-level" onClick={() =>
                    dispatch(setModificationState(TeacherRegisterQuantificationModificationStatus.Create))}>
                        <i className="fas fa fa-plus"></i>
                        Đăng kí trình độ
                    </button>
                </div> */}
                </div>

                <div className="row">
                    <div className="col-xl-6 col-lg-6 mb-4 col-xs-6 text-center">
                        <h6 className="m-0 font-weight-bold" id="btn-type" onClick={() => {
                            if (checked === false) {
                                setChecked(true)
                            }
                        }} style={{
                            color: checked ? "#F24E1E" : "#2F4F4F"
                        }}>Yêu cầu</h6>
                        <div style={{
                            height: "5px",
                            textAlign: "center",
                            margin: "auto",
                            width: "30%",
                            backgroundColor: checked ? "#F24E1E" : "#ffffff"
                        }}></div>
                    </div>
                    <div className="col-xl-6 col-lg-6 mb-4 col-xs-6 text-center">
                        <h6 className="m-0 font-weight-bold" id="btn-level" onClick={() => {
                            if (checked === true) {
                                setChecked(false)
                            }
                        }}
                            style={{
                                color: checked ? "#2F4F4F" : "#F24E1E"
                            }}>Đã duyệt</h6>
                        <div style={{
                            height: "5px",
                            textAlign: "center",
                            margin: "auto",
                            width: "30%",
                            backgroundColor: checked ? "#ffffff" : "#F24E1E"
                        }}></div>
                    </div>
                </div>

                {
                    function () {
                        if ((student_leaves.modificationState === StudentLeaveModificationStatus.Remove)) {
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
                                                    if (teacherLeave === 0) {
                                                        return;
                                                    }
                                                    updateStatusTeacherLeave("Not approved")
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

                {
                    function () {
                        if (checked === true) {
                            return (
                                <div className="row">
                                    <div className="col-xl-12 col-lg-12">
                                        <div className="card shadow mb-4" id="topcard-user">
                                            <div className="card-body">
                                                <TeacherLeaveList onSelect={onTeacherLeaveSelect} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                        else {
                            return (
                                <div className="row">
                                    <div className="col-xl-12 col-lg-12">
                                        <div className="card shadow mb-4" id="topcard-user">
                                            <div className="card-body">
                                                <TeacherLeaveApprovedList onSelect={onTeacherLeaveSelect} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    }()
                }


            </Fragment>
    );
};

export default RequestTeacher1;
