import jwt_decode from "jwt-decode";
import React, { Dispatch, Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import Popup from "reactjs-popup";
import TopCard from "../../common/components/TopCardUser";
import { getTeacherRegisterQuantificationByTeacherId } from "../../common/service/TeacherRegisterQuantification/GetTeacherRegisterQuantificationByTeacherId";
import { logout } from "../../store/actions/account.actions";
import { changeSelectedTeacherRegisterQuatificationApproved, setModificationState } from "../../store/actions/teacher_register_quantification.action";
import { IStateType, ITeacherRegisterQuantificationState } from "../../store/models/root.interface";
import { ITeacherRegisterQuantification, TeacherRegisterQuantificationModificationStatus } from "../../store/models/teacher_register_quantification.interface";
import "./TeacherLevel.css"
import TeacherLevelForm from "./TeacherLevelForm";
import TeacherLevelList from "./TeacherLevelList";
import TeacherLevelNotApprovedNowList from "./TeacherLevelNotApprovedNowList";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import Loading from "../../common/components/Loading";
import { getCourse } from "../../common/service/Course/GetCourse";

const TeacherLevel: React.FC = () => {
    const dispatch: Dispatch<any> = useDispatch();
    const teacherRegisterQuantifications: ITeacherRegisterQuantificationState = useSelector((state: IStateType) => state.teacher_register_quantifications);
    const numberApprovedCount: number = teacherRegisterQuantifications.approveds.length;
    const numberNotApprovedNowCount: number = teacherRegisterQuantifications.not_approved_now.length;
    const numberNotApprovedCount: number = teacherRegisterQuantifications.not_approves.length;
    const [popup, setPopup] = useState(false);
    var id_x = localStorage.getItem('id');
    var id: string = "";
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
                    trackPromise(getTeacherRegisterQuantificationByTeacherId(dispatch, id))
                    trackPromise(getCourse(dispatch))
                }
            }
            else {
                trackPromise(getTeacherRegisterQuantificationByTeacherId(dispatch, id))
                trackPromise(getCourse(dispatch))
            }
        }
    }, [dispatch, id, access_token, refresh_token]);

    function onTeacherRegisterQuantificationSelect(teacherRegisterQuantification: ITeacherRegisterQuantification): void {
        dispatch(changeSelectedTeacherRegisterQuatificationApproved(teacherRegisterQuantification));
        dispatch(setModificationState(TeacherRegisterQuantificationModificationStatus.None));
    }

    function onRemovePopup(value: boolean) {
        setPopup(false);
    }

    function onTeacherLevelRemove() {
        setPopup(true);
    }

    useEffect(() => {
        if (teacherRegisterQuantifications.modificationState === TeacherRegisterQuantificationModificationStatus.Edit){
            setPopup(true)
        }
    }, [teacherRegisterQuantifications.modificationState, popup])


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
            <div className="row">
                <TopCard title="TRÌNH ĐỘ ĐÃ DUYỆT" text={`${numberApprovedCount}`} icon="book" class="primary" />
                <TopCard title="TRÌNH ĐỘ CHƯA DUYỆT" text={`${numberNotApprovedNowCount}`} icon="book" class="danger" />
                <TopCard title="TRÌNH ĐỘ KHÔNG ĐƯỢC DUYỆT" text={`${numberNotApprovedCount}`} icon="book" class="danger" />
                {/* <div className="col-xl-6 col-md-4 mb-4" id="content-button-create-teacher-level">
                    <button className="btn btn-success btn-green" id="btn-create-teacher-level" onClick={() =>
                    dispatch(setModificationState(TeacherRegisterQuantificationModificationStatus.Create))}>
                        <i className="fas fa fa-plus"></i>
                        Đăng kí trình độ
                    </button>
                </div> */}
            </div>
            <ToastContainer />
            <div className="row">
                <div className="col-xl-12 col-lg-12 mb-4">
                    <button className="btn btn-success btn-green" id="btn-create-teacher-level" onClick={() => 
                        {
                            dispatch(setModificationState(TeacherRegisterQuantificationModificationStatus.Create))
                            onTeacherLevelRemove()
                        }}>
                        <i className="fas fa fa-plus"></i>
                        Đăng kí trình độ
                    </button>
                </div>
            </div>
            <div className="row">
                <div className="col-xl-6 col-md-6 mb-4">
                    <h3 className=" mb-2" id="level-teacher">Trình độ đã duyệt</h3>
                    <TeacherLevelList
                        onSelect={onTeacherRegisterQuantificationSelect}
                    />
                    {/* <TopCardLevel title="TRÌNH ĐỘ ĐÃ DUYỆT" text={`2`} icon="book" class="primary" />
                    <TopCardLevel title="TRÌNH ĐỘ CHƯA DUYỆT" text={`1`} icon="book" class="danger" /> */}
                </div>

                <div className="col-xl-6 col-md-6 mb-4">
                    <h3 className=" mb-2" id="level-teacher">Trình độ chưa được duyệt</h3>
                    <TeacherLevelNotApprovedNowList
                        onSelect={onTeacherRegisterQuantificationSelect}
                    />
                    {/* <TopCardLevel title="TRÌNH ĐỘ ĐÃ DUYỆT" text={`2`} icon="book" class="primary" />
                    <TopCardLevel title="TRÌNH ĐỘ CHƯA DUYỆT" text={`1`} icon="book" class="danger" /> */}
                </div>
            </div>

            <Popup
                open={popup}
                onClose={() => {
                    setPopup(false)
                    dispatch(setModificationState(TeacherRegisterQuantificationModificationStatus.None))
                }}
                closeOnDocumentClick
            >
                <>
                    {
                        function () {
                            if ((teacherRegisterQuantifications.modificationState === TeacherRegisterQuantificationModificationStatus.Create) || ( teacherRegisterQuantifications.modificationState === TeacherRegisterQuantificationModificationStatus.Edit)) {
                                return <TeacherLevelForm isCheck={onRemovePopup}/>
                            }
                        }()
                    }
                </>
            </Popup>

        </Fragment>
    );
};

export default TeacherLevel;
