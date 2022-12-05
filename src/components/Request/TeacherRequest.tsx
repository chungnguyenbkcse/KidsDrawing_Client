import React, { Fragment, Dispatch, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCurrentPath } from "../../store/actions/root.actions";
import TopCard from "../../common/components/TopCard";
import { ITeacherLeaveState, IStateType, IStudentLeaveState } from "../../store/models/root.interface";
import TeacherRequestList from "./TeacherRequestList";
import jwt_decode from "jwt-decode";
import { logout } from "../../store/actions/account.actions";
import { getTeacherLeave } from "../../common/service/TeacherLeave/GetTeacherLeave";
import { toast, ToastContainer } from "react-toastify";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import Loading from "../../common/components/Loading";
import TeacherRequestList1 from "./TeacherRequestList1";
import TeacherRequestList2 from "./TeacherRequest1";
import { StudentLeaveModificationStatus } from "../../store/models/student_leave.interface";
import Popup from "reactjs-popup";
import { ITeacherLeave } from "../../store/models/teacher_leave.interface";
import { putTeacherLeaveStatus } from "../../common/service/TeacherLeave/PutTeacherLeave";

const TeacherRequest: React.FC = () => {
  const teachers: ITeacherLeaveState = useSelector((state: IStateType) => state.teacher_leaves);
  const numberItemsCount: number = teachers.leaves.filter((ele) => ele.status === "Teacher approved" || ele.status === "Not approve now").length;
  const { promiseInProgress } = usePromiseTracker();
  const student_leaves: IStudentLeaveState = useSelector((state: IStateType) => state.student_leaves);
  const [popup, setPopup] = useState(false);

  function onRemoveTeacherLeave() {
    setPopup(true)
  }

  const dispatch: Dispatch<any> = useDispatch();
  dispatch(updateCurrentPath("Yêu cầu nghỉ dạy", ""));

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
                  trackPromise(getTeacherLeave(dispatch))
                }
            }
            else {
              trackPromise(getTeacherLeave(dispatch))
            }
        }
    }, [dispatch, access_token, refresh_token]);

    const [checked, setChecked] = useState(true);

    const handleTeacherLeave = (teacher_leave_id: number, status: string) => {
      const id = toast.loading("Đang xử lý. Vui lòng đợi giây lát...", {
        position: toast.POSITION.TOP_CENTER
      });
      (putTeacherLeaveStatus(dispatch, teacher_leave_id, {
        status: status
      }, id))
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
                                      
                                        var id_xxx = localStorage.getItem('teacher_leave_id');
                                        let teacher_leave_id = 0;
                                        if (id_xxx !== null) {
                                          teacher_leave_id = parseInt(id_xxx)
                                        }

                                        if (teacher_leave_id === 0) {
                                          return;
                                        }
                                        handleTeacherLeave(teacher_leave_id, "Not approved")
                                        
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

      <h1 className="h3 mb-2 text-gray-800">Yêu cầu nghỉ dạy</h1>
      {/* <p className="mb-4">Summary and overview of our admin stuff here</p> */}

      <div className="row">
        <TopCard title="CHƯA DUYỆT" text={`${teachers.leaves.filter((ele) => ele.status === "Not approve now" || ele.status === "Teacher approved").length}`} icon="box" class="primary" />
        <TopCard title="ĐÃ DUYỆT" text={`${teachers.acceptLeaves.length}`} icon="box" class="primary" />
      </div>

<div className="row">
<div className="col-xl-6 col-lg-6 mb-4 col-xs-6 text-center">
  <h6 className="m-0 font-weight-bold" id="btn-type" onClick={() => {
    if (checked === false) {
      setChecked(true)
    }
  }} style={{
    color: checked ? "#F24E1E" : "#2F4F4F"
  }}>Chưa duyệt</h6>
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
    if (checked === true) {
      return (
        <div className="row">

        <div className="col-xl-12 col-lg-12">
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-green">Danh sách yêu cầu</h6>
            </div>
            <div className="card-body">
              <TeacherRequestList onSelect={onRemoveTeacherLeave}/>
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
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-green">Danh sách yêu cầu</h6>
            </div>
            <div className="card-body">
              <TeacherRequestList2 />
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

export default TeacherRequest;