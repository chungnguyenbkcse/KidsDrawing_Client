import jwt_decode from "jwt-decode";
import React, { Dispatch, Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TopCard from "../../common/components/TopCardUser";
import { logout } from "../../store/actions/account.actions";
import { changeSelectedChild, setModificationState } from "../../store/actions/child.action";
import { IChildState, IScheduleTimeClassState, IStateType, IUserRegisterJoinSemesterState } from "../../store/models/root.interface";
import { IChild, ChildModificationStatus } from "../../store/models/child.interface";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import Loading from "../../common/components/Loading";
import "./ParentHome.css"
import Popup from "reactjs-popup";
import AccountChildForm from "../AccountChild/AccountChildForm";
import { getScheduleTimeByParent } from "../../common/service/ScheduleTimeClass/GetScheduleTimeByParent";
import { updateCurrentPath } from "../../store/actions/root.actions";
import { ScheduleComponent, Day, Inject, ViewsDirective, ViewDirective } from "@syncfusion/ej2-react-schedule";

import "@syncfusion/ej2-base/styles/material.css";
import "@syncfusion/ej2-buttons/styles/material.css";
import "@syncfusion/ej2-calendars/styles/material.css";
import "@syncfusion/ej2-dropdowns/styles/material.css";
import "@syncfusion/ej2-inputs/styles/material.css";
import "@syncfusion/ej2-lists/styles/material.css";
import "@syncfusion/ej2-navigations/styles/material.css";
import "@syncfusion/ej2-popups/styles/material.css";
import "@syncfusion/ej2-splitbuttons/styles/material.css";
import "@syncfusion/ej2-react-schedule/styles/material.css";
import { getUserRegisterJoinSemesterByPayer } from "../../common/service/UserRegisterJoinSemester/GetUserRegisterJoinSemesterByPayer";
import { ToastContainer } from "react-toastify";
import AccountChildList1 from "./AccountChildList1";
import { getInforChildByParent } from "../../common/service/Childs/GetInforChildByParent";


const ParentHome: React.FC = () => {
    const dispatch: Dispatch<any> = useDispatch();
    const childs: IChildState = useSelector((state: IStateType) => state.childs);
    const schedule_time_classes: IScheduleTimeClassState = useSelector((state: IStateType) => state.schedule_time_classes);
    const user_register_join_semesters: IUserRegisterJoinSemesterState = useSelector((state: IStateType) => state.user_register_join_semesters);
    const numberChildCount: number = childs.childs.length;
    const totalMoney: number = user_register_join_semesters.completed.reduce((prev, next) => prev + ((next.price * 1) || 0), 0);
    var id_x = localStorage.getItem('id');
    var id: number = 0;
    if (id_x !== null) {
        id = parseInt(id_x);
    }

    const [checked, setChecked] = useState(true);

    console.log(schedule_time_classes.schedule_time_classes)

    const [popup, setPopup] = useState(false);

    function onUserSelect(lesson: IChild): void {
        dispatch(changeSelectedChild(lesson));
        onUserRemove();
        dispatch(setModificationState(ChildModificationStatus.None));
    }

    function onUserRemove() {
        setPopup(true);
    }

    function onRemovePopup(value: boolean) {
        setPopup(false);
    }

    dispatch(updateCurrentPath("Trang chủ", ""));

    const [searchTerm, setSearchTerm] = useState("");

    const { promiseInProgress } = usePromiseTracker();

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
                    trackPromise(getInforChildByParent(dispatch, id))
                    trackPromise(getScheduleTimeByParent(dispatch, id))
                    trackPromise(getUserRegisterJoinSemesterByPayer(dispatch, id))
                }
            }
            else {
                trackPromise(getInforChildByParent(dispatch, id))
                trackPromise(getScheduleTimeByParent(dispatch, id))
                trackPromise(getUserRegisterJoinSemesterByPayer(dispatch, id))
            }
        }
    }, [dispatch, access_token, refresh_token, id]);

    let data: object[] = []

    schedule_time_classes.schedule_time_classes.map((ele, index) => {
        if (ele !== undefined) {
            return data.push({
                Id: index,
                Subject: ele.class_name !== undefined && ele.class_name !== null ? ele.class_name : "",
                StartTime: new Date(ele.start_time),
                EndTime: new Date(ele.end_time),
                IsAllDay: false
            })
        }
        return 1
    })

    return (
        promiseInProgress ?
            <div className="loader"></div> : <Fragment>
                {/* <h1 className="h3 mb-2 text-gray-800" id="home-teacher">Trang chủ</h1> */}
                {/* <p className="mb-4">Summary and overview of our admin stuff here</p> */}
                <ToastContainer />
                <div className="row">
                    <TopCard title="TÀI KHOẢN CON" text={`${numberChildCount}`} icon="user" class="primary" />
                    <TopCard title="SỐ TIỀN" text={`${totalMoney}`} icon="donate" class="primary" />
                    <div className="col-xl-6 col-md-6 mb-4" id="content-button-create-teacher-level">
                        <button className="btn btn-success btn-green mr-0" id="btn-create-teacher-level" onClick={() => {
                            dispatch(setModificationState(ChildModificationStatus.Create))
                            onUserRemove()
                        }}>
                            <i className="fas fa fa-plus"></i>
                            Thêm tài khoản con
                        </button>
                    </div>
                </div>

                <div className="row" id="search-box">
                    <div className="col-xl-12 col-lg-12">
                        <div className="input-group" id="search-content">
                            <div className="form-outline">
                                <input type="text" id="form1" className="form-control" placeholder="Tìm kiếm" onChange={(event) => {
                                    setSearchTerm(event.target.value)
                                    console.log(searchTerm)
                                }} />
                            </div>
                            <button type="button" className="btn btn-primary">
                                <i className="fas fa-search"></i>
                            </button>
                        </div>
                    </div>
                </div>

                <Popup
                    open={popup}
                    onClose={() => setPopup(false)}
                    closeOnDocumentClick
                >
                    <>
                        {
                            function () {
                                if ((childs.modificationState === ChildModificationStatus.Create) || ((childs.selectedChild) && (childs.modificationState === ChildModificationStatus.Edit))) {
                                    return <AccountChildForm isCheck={onRemovePopup} />
                                }
                            }()
                        }
                    </>
                </Popup>

                <div className="row">
                    <div className="col-xl-6 col-lg-6 mb-4 col-xs-6 text-center">
                        <h6 className="m-0 font-weight-bold" id="btn-type" onClick={() => {
                            if (checked === false) {
                                setChecked(true)
                            }
                        }} style={{
                            color: checked ? "#F24E1E" : "#2F4F4F"
                        }}>Tài khoản con</h6>
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
                            }}>Lịch trong ngày</h6>
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
                                <Fragment>
                                    <div className="row">
                                        <div className="col-xl-12 col-md-12 mb-4">
                                            <h3 className=" mb-2" id="level-teacher">Danh sách tài khoản con</h3>
                                            <AccountChildList1
                                                onSelect={onUserSelect}
                                            />
                                        </div>
                                    </div>

                                </Fragment>
                            )
                        }
                        else {
                            return (
                                <Fragment>
                                    <div className="row">
                                        <div className="col-xl-12 col-md-12 mb-4">
                                            <h3 className=" mb-2" id="level-teacher">Lịch trong ngày</h3>
                                            <div className="card shadow mb-4">
                                                <div className="card-body">
                                                    <ScheduleComponent height='550px' selectedDate={new Date()} eventSettings={{
                                                        dataSource: data, fields: {
                                                            id: 'Id',
                                                            subject: { name: 'Subject' },
                                                            isAllDay: { name: 'IsAllDay' },
                                                            startTime: { name: 'StartTime' },
                                                            endTime: { name: 'EndTime' }
                                                        }
                                                    }}>

                                                        <ViewsDirective>
                                                            <ViewDirective option='Day' startHour='00:00' endHour='23:59' /> 
                                                        </ViewsDirective>
                                                        <Inject services={[Day]} />
                                                    </ScheduleComponent>


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

export default ParentHome;
