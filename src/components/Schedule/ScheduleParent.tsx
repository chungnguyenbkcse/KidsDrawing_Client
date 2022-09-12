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

import { Eventcalendar, setOptions, CalendarNav, SegmentedGroup, SegmentedItem, CalendarPrev, CalendarToday, CalendarNext } from '@mobiscroll/react';
import { getScheduleTimeByParent } from "../../common/service/ScheduleTimeClass/GetScheduleTimeByParent";

setOptions({
    theme: 'ios',
    themeVariant: 'light'
});

const ScheduleParent: React.FC = () => {
    const dispatch: Dispatch<any> = useDispatch();
    const path: IRootPageStateType = useSelector((state: IStateType) => state.root.page);
    const schedule_time_classes: IScheduleTimeClassState = useSelector((state: IStateType) => state.schedule_time_classes);
    var id_x = localStorage.getItem('id');
    var id: number = 2;
    if (id_x !== null) {
        id = parseInt(id_x);
    }

    const [view, setView] = React.useState('month');


    const [calView, setCalView] = React.useState(
        {
            calendar: { labels: true }
        }
    );

    const changeView = (event: any) => {
        let calView: any;
        
        switch (event.target.value) {
            case 'year':
                calView = {
                    calendar: { type: 'year' }
                }
                break;
            case 'month':
                calView = {
                    calendar: { labels: true }
                }
                break;
            case 'week':
                calView = {
                    schedule: { type: 'week' }
                }
                break;
            case 'day':
                calView = {
                    schedule: { type: 'day' }
                }
                break;
            case 'agenda':
                calView = {
                    calendar: { type: 'week' },
                    agenda: { type: 'week' }
                }
                break;
        }

        setView(event.target.value);
        setCalView(calView);
    }
    
    const customWithNavButtons = () => {
        return <React.Fragment>
            <CalendarNav className="cal-header-nav" />
            <div className="cal-header-picker">
                <SegmentedGroup value={view} onChange={changeView}>
                    <SegmentedItem value="year">
                        Year
                    </SegmentedItem>
                    <SegmentedItem value="month">
                        Month
                    </SegmentedItem>
                    <SegmentedItem value="week">
                        Week
                    </SegmentedItem>
                    <SegmentedItem value="day">
                        Day
                    </SegmentedItem>
                    <SegmentedItem value="agenda">
                        Agenda
                    </SegmentedItem>
                </SegmentedGroup>
            </div>
            <CalendarPrev className="cal-header-prev" />
            <CalendarToday className="cal-header-today" />
            <CalendarNext className="cal-header-next" />
        </React.Fragment>;
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
    let data: any[] = [];
    if (schedule_time_classes.schedule_time_classes.length > 0) {
        schedule_time_classes.schedule_time_classes.map((ele, idx) => {

            return data.push({
                // base properties
                title: ele.class_name,
                color: '#56ca70',
                start: ele.start_time,
                end: ele.end_time,
                // add any property you'd like
                busy: true,
                description: 'Weekly meeting with team',
                location: 'Office'
            })
        
        })
    }

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
                        <Eventcalendar
            renderHeader={customWithNavButtons}
            height={750}
            view={calView}
            data={data}
            cssClass="md-switching-view-cont"
        />

                                
                        </div>
                    </div>
                </div>
            </div>
        </Fragment >
    );
};

export default ScheduleParent;
