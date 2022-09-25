import jwt_decode from "jwt-decode";
import React, { Dispatch, Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TopCard from "../../common/components/TopCardUser";
import { logout } from "../../store/actions/account.actions";
import { IScheduleTimeClassState, IStateType, IUserState } from "../../store/models/root.interface";
import { UserModificationStatus } from "../../store/models/user.interface";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import Loading from "../../common/components/Loading";
import "./ParentHome.css"
import Popup from "reactjs-popup";
import AccountChildForm from "../AccountChild/AccountChildForm";
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
import { getScheduleTimeByChild } from "../../common/service/ScheduleTimeClass/GetScheduleTimeByStudent";


const StudentHome: React.FC = () => {
    const dispatch: Dispatch<any> = useDispatch();
    const users: IUserState = useSelector((state: IStateType) => state.users);
    const schedule_time_classes: IScheduleTimeClassState = useSelector((state: IStateType) => state.schedule_time_classes);
    const numberChildCount: number = users.students.length;
    var id_x = localStorage.getItem('id');
    var id: number = 2;
    if (id_x !== null) {
        id = parseInt(id_x);
    }

    console.log(schedule_time_classes.schedule_time_classes)

    const [popup, setPopup] = useState(false);


    function onRemovePopup(value: boolean) {
        setPopup(false);
    }

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
                    trackPromise(getScheduleTimeByChild(dispatch, id))
                }
            }
            else {
                trackPromise(getScheduleTimeByChild(dispatch, id))
            }
        }
    }, [dispatch, access_token, refresh_token, id]);

    let data: object[] = []

    schedule_time_classes.schedule_time_classes.map((ele, index) => {
        return data.push({
            Id: index,
            Subject: ele.class_name !== undefined && ele.class_name !== null ? ele.class_name : "",
            StartTime: new Date(ele.start_time),
            EndTime: new Date(ele.end_time),
            IsAllDay: false
        })
    })

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
                    <TopCard title="KHÓA HỌC" text={`${numberChildCount}`} icon="book" class="primary" />
                    <TopCard title="CUỘC THI" text={`${numberChildCount}`} icon="book" class="primary" />
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
                                if ((users.modificationState === UserModificationStatus.Create) || ((users.selectedUser) && (users.modificationState === UserModificationStatus.Edit))) {
                                    return <AccountChildForm isCheck={onRemovePopup} />
                                }
                            }()
                        }
                    </>
                </Popup>

                <div className="row">
                    <div className="col-xl-6 col-md-6 mb-4">
                        <h3 className=" mb-2" id="level-teacher">Thành tích</h3>

                    </div>
                    <div className="col-xl-6 col-md-6 mb-4">
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
    );
};

export default StudentHome;
