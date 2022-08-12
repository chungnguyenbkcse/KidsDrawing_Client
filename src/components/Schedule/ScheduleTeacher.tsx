import React, { Fragment, Dispatch, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IStateType, IRootPageStateType, ITimeScheduleState, ITimeScheduleTeacherState } from "../../store/models/root.interface";
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

import { getScheduleTeacher } from "../../common/service/ScheduleTeacher/GetScheduleTeacher";
import { updateCurrentPath } from "../../store/actions/root.actions";

const ScheduleTeacher: React.FC = () => {
    const dispatch: Dispatch<any> = useDispatch();
    const path: IRootPageStateType = useSelector((state: IStateType) => state.root.page);
    const time_schedule_teacherss: ITimeScheduleTeacherState = useSelector((state: IStateType) => state.time_schedule_teachers);
    var id_x = localStorage.getItem('id');
    var id: number = 2;
    if (id_x !== null) {
        id = parseInt(id_x);
    }
    useEffect(() => {
        dispatch(getScheduleTeacher(id))
    }, [dispatch])
    let data: object[] = []

    //console.log(time_schedules.timeSchedules)

    time_schedule_teacherss.timeScheduleTeachers.map((ele: any, index: any) => {
        //console.log(ele)
        data.push({
            Id: index,
            Subject: `Lớp ${ele.class_name}:  Buổi học ${index + 1}`,
            StartTime: new Date(ele.start_time),
            EndTime: new Date(ele.end_time),
            IsAllDay: false
        })
    })

    useEffect(() => {
        dispatch(clearSelectedProduct());
        dispatch(updateCurrentPath("Thời khóa biểu", ""));
    }, [path.area, dispatch]);

    return (
        <Fragment>
            <div className="row">
                <div className="col-xl-12 col-lg-12">
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

export default ScheduleTeacher;
