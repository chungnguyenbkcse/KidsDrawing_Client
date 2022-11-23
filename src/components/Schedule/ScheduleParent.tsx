import React, { Fragment, Dispatch, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IStateType, IRootPageStateType, IScheduleTimeClassState } from "../../store/models/root.interface";
import {
    clearSelectedProduct
} from "../../store/actions/products.action";


import { updateCurrentPath } from "../../store/actions/root.actions";
import { logout } from "../../store/actions/account.actions";
import jwt_decode from "jwt-decode";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import Loading from "../../common/components/Loading";

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
import { getScheduleTimeByParent } from "../../common/service/ScheduleTimeClass/GetScheduleTimeByParent";


const ScheduleParent: React.FC = () => {
    const dispatch: Dispatch<any> = useDispatch();
    const path: IRootPageStateType = useSelector((state: IStateType) => state.root.page);
    const schedule_time_classes: IScheduleTimeClassState = useSelector((state: IStateType) => state.schedule_time_classes);
    var id_x = localStorage.getItem('id');
    var id: number = 0;
    if (id_x !== null) {
        id = parseInt(id_x);
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
                    trackPromise(getScheduleTimeByParent(dispatch, id))
                }
            }
            else {
                trackPromise(getScheduleTimeByParent(dispatch, id))
            }
        }
    }, [dispatch, access_token, refresh_token, id])

    let data: object[] = []

  schedule_time_classes.schedule_time_classes.map((ele, index) => {
    if (ele !== undefined && ele !== null) {
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

    useEffect(() => {
        dispatch(clearSelectedProduct());
        dispatch(updateCurrentPath("Thời khóa biểu", ""));
    }, [path.area, dispatch]);

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

export default ScheduleParent;
