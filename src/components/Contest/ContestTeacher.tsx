import React, { Dispatch, Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TopCard from "../../common/components/TopCardUser";
import { getTeacherRegisterQuantificationByTeacherId } from "../../common/service/TeacherRegisterQuantification/GetTeacherRegisterQuantificationByTeacherId";
import { getUserById } from "../../common/service/User/GetUserById";
import { IContestTeacherState, IRootPageStateType, IStateType } from "../../store/models/root.interface";
import "./ContestTeacher.css"
import { updateCurrentPath } from "../../store/actions/root.actions";
import { logout } from "../../store/actions/account.actions";
import jwt_decode from "jwt-decode";
import { getContestTeacher } from "../../common/service/ContestTeacher/GetContestTeacher";
import ContestDoingList from "./ContestDoingTeacherList";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import Loading from "../../common/components/Loading";
import ContestTeacherNotDoingList from "./ContestTeacherNotDoingList";
import ContestTeacherEndList from "./ContestTeacherEndList";
import ContestTeacherDoingList from "./ContestTeacherDoingList";

const ContestTeacher: React.FC = () => {
    const dispatch: Dispatch<any> = useDispatch();
    const contest_teachers: IContestTeacherState = useSelector((state: IStateType) => state.contest_teachers);
    const path: IRootPageStateType = useSelector((state: IStateType) => state.root.page);
    const numberContestOpeningCount: number = contest_teachers.contest_opening.length;
    const numberContestEndCount: number = contest_teachers.contest_end.length;
    const numberContestNotOpenNowCount: number = contest_teachers.contest_not_open_now.length;
    var id_x = localStorage.getItem('id');
    var id: number = 0;
    if (id_x !== null) {
        id = parseInt(id_x);
    }
    const { promiseInProgress } = usePromiseTracker();
    console.log(contest_teachers)
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
                    trackPromise(getUserById(dispatch, id))
                    trackPromise(getContestTeacher(dispatch, id))
                }
            }
            else {
                trackPromise(getTeacherRegisterQuantificationByTeacherId(dispatch, id))
                trackPromise(getUserById(dispatch, id))
                trackPromise(getContestTeacher(dispatch, id))
            }
        }
        
    }, [dispatch, id, access_token, refresh_token]);

    useEffect(() => {
        dispatch(updateCurrentPath("Cuộc thi", ""));
    }, [path.area, dispatch])


    const [checked1, setChecked1] = useState(true);
    const [checked2, setChecked2] = useState(false);
    const [checked3, setChecked3] = useState(false);
    return (
        promiseInProgress ?
      <div className="loader"></div> : <Fragment>
            {/* <h1 className="h3 mb-2 text-gray-800" id="home-teacher">Trang chủ</h1> */}
            {/* <p className="mb-4">Summary and overview of our admin stuff here</p> */}

            <div className="row">
                <TopCard title="CHƯA DIỄN RA" text={`${numberContestNotOpenNowCount}`} icon="book" class="primary" />
                <TopCard title="ĐANG DIỄN RA" text={`${numberContestOpeningCount}`} icon="book" class="primary" />
                <TopCard title="ĐÃ KẾT THÚC" text={`${numberContestEndCount}`} icon="book" class="primary" />
                {/* <div className="col-xl-6 col-md-4 mb-4" id="content-button-create-teacher-level">
                    <button className="btn btn-success btn-green" id="btn-create-teacher-level" onClick={() =>
                    dispatch(setModificationState(TeacherRegisterQuantificationModificationStatus.Create))}>
                        <i className="fas fa fa-plus"></i>
                        Đăng kí trình độ
                    </button>
                </div> */}
            </div>

            <div className="row">
                <div className="col-xl-4 col-lg-4 mb-4 col-xs-4 text-center">
                    <h6 className="m-0 font-weight-bold" id="btn-type" onClick={() => {
                        if (checked1 === false) {
                            setChecked1(true)
                            setChecked2(false)
                            setChecked3(false)
                        }
                    }} style={{
                        color: checked1 ? "#F24E1E" : "#2F4F4F"
                    }}>Chưa diễn ra</h6>

                    <div style={{
                        height: "5px",
                        textAlign: "center",
                        margin: "auto",
                        width: "30%",
                        backgroundColor: checked1 ? "#F24E1E" : "#ffffff"
                    }}></div>
                </div>
                <div className="col-xl-4 col-lg-4 mb-4 col-xs-4 text-center">
                    <h6 className="m-0 font-weight-bold" id="btn-level" onClick={() => {
                        if (checked2 === false) {
                            setChecked2(true)
                            setChecked1(false)
                            setChecked3(false)
                        }
                    }}
                        style={{
                            color: checked2 ? "#F24E1E" : "#2F4F4F"
                        }}>Đang diễn ra</h6>
                    <div style={{
                        height: "5px",
                        textAlign: "center",
                        margin: "auto",
                        width: "30%",
                        backgroundColor: checked2 ? "#F24E1E" : "#ffffff"
                    }}></div>
                </div>

                <div className="col-xl-4 col-lg-4 mb-4 col-xs-4 text-center">
                    <h6 className="m-0 font-weight-bold" id="btn-level" onClick={() => {
                        if (checked3 === false) {
                            setChecked3(true)
                            setChecked1(false)
                            setChecked2(false)
                        }
                    }}
                        style={{
                            color: checked3 ? "#F24E1E" : "#2F4F4F"
                        }}>Đã kết thúc</h6>
                    <div style={{
                        height: "5px",
                        textAlign: "center",
                        margin: "auto",
                        width: "30%",
                        backgroundColor: checked3 ? "#F24E1E" : "#ffffff"
                    }}></div>
                </div>
            </div>


            {
                function () {
                    if (checked1 === true) {
                        return (
                            <Fragment>
                                <div className="row">
                                    <div className="col-xl-12 col-lg-12">
                                        <div className="card shadow mb-4" id="topcard-user">
                                            <div className="card-body">
                                                <ContestTeacherNotDoingList />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Fragment>
                        )
                    }
                    else if ( checked2 === true) {
                        return (
                            <Fragment>
                                <div className="row">
                                    <div className="col-xl-12 col-lg-12">
                                        <div className="card shadow mb-4" id="topcard-user">
                                            <div className="card-body">
                                                <ContestTeacherDoingList />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Fragment>
                        )
                    }

                    else if ( checked3 === true) {
                        return (
                            <Fragment>
                                <div className="row">
                                    <div className="col-xl-12 col-lg-12">
                                        <div className="card shadow mb-4" id="topcard-user">
                                            <div className="card-body">
                                                <ContestTeacherEndList />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Fragment>
                        )
                    }
                }()
            }


        </Fragment>
    );
};

export default ContestTeacher;
