import React, { Dispatch, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IStateType, IScheduleState } from "../../store/models/root.interface";
import { ISchedule, ScheduleModificationStatus } from "../../store/models/schedule.interface";
import { useHistory } from "react-router-dom";
import { setModificationState } from "../../store/actions/schedule.action";
import { toNonAccentVietnamese } from "../../common/components/ConvertVietNamese";

export type scheduleListProps = {
    onSelect?: (schedule: ISchedule) => void;
    value?: string;
    children?: React.ReactNode;
};

function ScheduleList(props: scheduleListProps): JSX.Element {
    const dispatch: Dispatch<any> = useDispatch();
    const schedules: IScheduleState = useSelector((state: IStateType) => state.schedules);
    const history = useHistory();
    console.log(props.value)


    const scheduleElements: (JSX.Element | null)[] = schedules.schedules.filter((val) => {
        if (props.value == ""){
          return val;
        }
        else if (typeof props.value !== 'undefined' && (toNonAccentVietnamese(val.name).toLowerCase().includes(props.value.toLowerCase()) || val.name.toLowerCase().includes(props.value.toLowerCase()))){
          return val;
        }
      }).map((schedule, index) => {
        //console.log(strDate.substring(0, 10) + " " + strDate.substring(11,19))
        if (!schedule) { return null; }
        return (<tr className={`table-row ${(schedules.selectedSchedule && schedules.selectedSchedule.id === schedule.id) ? "selected" : ""}`}
            key={`schedule_${schedule.id}`}>
            <th scope="row">{index + 1}</th>
            <td>{schedule.name}</td>
            <td>
                <button type="button" className="btn btn-primary" onClick={() => {
                    if (props.onSelect) props.onSelect(schedule);
                    dispatch(setModificationState(ScheduleModificationStatus.Edit))
                }}>Chỉnh sửa</button>
            </td>
            <td>
                <button type="button" className="btn btn-danger" onClick={() => {
                    if (props.onSelect) props.onSelect(schedule);
                    dispatch(setModificationState(ScheduleModificationStatus.Remove))
                }}>Xóa</button>
            </td>
        </tr>);
    });


    return (
        <Fragment>
            <div className="table-responsive portlet">
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Tên</th>
                            <th scope="col">Hành động</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {scheduleElements}
                    </tbody>
                </table>
            </div>
        </Fragment>
    );
}

export default ScheduleList;
