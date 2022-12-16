import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { IClassesStudent } from "../../store/models/classes_student.interface";
import { IScheduleTimeClassState, IStateType } from "../../store/models/root.interface";

import { ScheduleComponent, Day, Inject, ViewsDirective, ViewDirective, Week, Month } from "@syncfusion/ej2-react-schedule";

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

export type classTeacherListProps = {
    onSelect?: (classTeacher: IClassesStudent) => void;
    children?: React.ReactNode;
};

function ScheduleForChild(props: classTeacherListProps): JSX.Element {
    const schedule_time_classes: IScheduleTimeClassState = useSelector((state: IStateType) => state.schedule_time_classes);


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
        <Fragment>
            <div className="row">
                <div className="col-xl-12 col-lg-12 col-md-12 col-xs-12">
                    <h3 className=" mb-2" id="level-teacher">Lịch học của bé</h3>
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
                                <ViewDirective option='Day'/>
                                <ViewDirective option='Week'/>
                                <ViewDirective option='Month'/>
                            </ViewsDirective>
                          <Inject services={[Day, Week, Month]}/>
                            </ScheduleComponent>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default ScheduleForChild;
