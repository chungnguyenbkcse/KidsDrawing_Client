import React, { Fragment, Dispatch, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCurrentPath } from "../../store/actions/root.actions";
import { IStateType, IRootPageStateType, ITimeScheduleState } from "../../store/models/root.interface";
import {
    clearSelectedProduct
} from "../../store/actions/products.action";
import { getInfoMyClass } from "../../common/service/MyClass/GetInfoMyClass";
import { logout } from "../../store/actions/account.actions";
import jwt_decode from "jwt-decode";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import Loading from "../../common/components/Loading";
import ScheduleForClassList from "./ScheduleForClassList";

const ScheduleClass: React.FC = () => {
    const dispatch: Dispatch<any> = useDispatch();
    const path: IRootPageStateType = useSelector((state: IStateType) => state.root.page);
    const time_schedules: ITimeScheduleState = useSelector((state: IStateType) => state.time_schedules);

    const { promiseInProgress } = usePromiseTracker();

    let data: object[] = []

    time_schedules.timeSchedules.map((ele: any, index: any) => {
        return data.push({
            Id: index,
            Subject: `Buổi học ${index + 1}`,
            StartTime: new Date(ele.start_time),
            EndTime: new Date(ele.end_time),
            IsAllDay: false
        })
    })

    var id_x = localStorage.getItem('class_id')
    let class_id: number = 0;
    if (id_x !== null){
        class_id = parseInt(id_x)
    }


    var id_y = localStorage.getItem('class_name')
    let class_name: string = "";
    if (id_y !== null){
        class_name = id_y
    }

    console.log(new Date(2018, 1, 15, 12, 30))

    useEffect(() => {
        dispatch(clearSelectedProduct());
        dispatch(updateCurrentPath("Lớp",""));
    }, [path.area, dispatch]);

    return (
        promiseInProgress ?
      <div className="loader"></div> :<Fragment>
            <div className="row">
                <div className="col-xl-12 col-lg-12">
                    <div className="card shadow mb-4">
                        
                        <div className="card-body">
                            <ScheduleForClassList />
                        </div>
                    </div>
                </div>
            </div>
        </Fragment >
    );
};

export default ScheduleClass;
