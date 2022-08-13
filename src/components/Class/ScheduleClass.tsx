import React, { Fragment, Dispatch, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCurrentPath } from "../../store/actions/root.actions";
import { IStateType, IRootPageStateType, ITimeScheduleState } from "../../store/models/root.interface";
import {
    clearSelectedProduct
} from "../../store/actions/products.action";
import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Inject, ViewsDirective, ViewDirective } from "@syncfusion/ej2-react-schedule";

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
import { useLocation } from "react-router-dom";
import { getInfoMyClass } from "../../common/service/MyClass/GetInfoMyClass";
import { logout } from "../../store/actions/account.actions";
import jwt_decode from "jwt-decode";

const ScheduleClass: React.FC = () => {
    const dispatch: Dispatch<any> = useDispatch();
    const path: IRootPageStateType = useSelector((state: IStateType) => state.root.page);
    const time_schedules: ITimeScheduleState = useSelector((state: IStateType) => state.time_schedules);

    let data: object[] = []

    time_schedules.timeSchedules.map((ele: any, index: any) => {
        data.push({
            Id: index,
            Subject: `Buổi học ${index + 1}`,
            StartTime: new Date(ele.start_time),
            EndTime: new Date(ele.end_time),
            IsAllDay: false
        })
    })

    const { state } = useLocation<any>();

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
                    dispatch(getInfoMyClass(state.class_id))
                }
            }
            else {
                dispatch(getInfoMyClass(state.class_id))
            }
        }
    }, [dispatch]);

    console.log(new Date(2018, 1, 15, 12, 30))

    useEffect(() => {
        dispatch(clearSelectedProduct());
        dispatch(updateCurrentPath("Lớp", "Lớp CM-1"));
    }, [path.area, dispatch]);

    return (
        <Fragment>
            <h1 className="h3 mb-2 text-gray-800">Lớp CM-1</h1>
            <p className="mb-4">Thông tin chung</p>
            <div className="row">
                <div className="col-xl-12 col-lg-12">
                    <div className="card shadow mb-4">
                        <div className="card-header py-3">
                            <h6 className="m-0 font-weight-bold text-green">Lịch học chi tiết</h6>
                        </div>
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
                                    <ViewDirective option='WorkWeek' startHour='07:00' endHour='22:00' />
                                    <ViewDirective option='Week' startHour='07:00' endHour='22:00' />
                                    <ViewDirective option='Month' showWeekend={false} />
                                </ViewsDirective>
                                <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
                            </ScheduleComponent>;
                        </div>
                    </div>
                </div>
            </div>
        </Fragment >
    );
};

export default ScheduleClass;
