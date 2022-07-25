import React, { Fragment, Dispatch, useState, useEffect } from "react";
import ScheduleList from "./ScheduleList";
import ScheduleForm from "./ScheduleForm";
import TopCard from "../../common/components/TopCard";
import "./Schedule.css";
import { useDispatch, useSelector } from "react-redux";
import { updateCurrentPath } from "../../store/actions/root.actions";
import { IScheduleState, IStateType, IRootPageStateType } from "../../store/models/root.interface";
import Popup from "reactjs-popup";
import {
    removeSchedule, clearSelectedSchedule, setModificationState,
    changeSelectedSchedule
} from "../../store/actions/schedule.action";
import { addNotification } from "../../store/actions/notifications.action";
import { ScheduleModificationStatus, ISchedule } from "../../store/models/schedule.interface";
import { getSchedule } from "../../common/service/Schedule/GetSchedule";
import { deleteSchedule } from "../../common/service/Schedule/DeleteSchedule";
import { getLesson } from "../../common/service/Lesson/GetLesson";
import { getScheduleItem } from "../../common/service/ScheduleItem/GetScheduleItem";


const Schedule: React.FC = () => {
    const dispatch: Dispatch<any> = useDispatch();
    const schedules: IScheduleState = useSelector((state: IStateType) => state.schedules);
    const path: IRootPageStateType = useSelector((state: IStateType) => state.root.page);
    const numberItemsCount: number = schedules.schedules.length;
    const [popup, setPopup] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        dispatch(getSchedule())
        dispatch(getLesson())
        dispatch(getScheduleItem())
    }, [dispatch])

    useEffect(() => {
        dispatch(clearSelectedSchedule());
        dispatch(updateCurrentPath("Lịch học", "Danh sách"));
    }, [path.area, dispatch]);

    function onScheduleSelect(schedule: ISchedule): void {
        dispatch(changeSelectedSchedule(schedule));
        onScheduleRemove();
        dispatch(setModificationState(ScheduleModificationStatus.None));
    }

    function onScheduleRemove() {
        setPopup(true);
    }

    function onRemovePopup(value: boolean) {
        setPopup(false);
    }


    return (
        <Fragment>
            <h1 className="h3 mb-2 text-gray-800">Lịch học</h1>
            <p className="mb-4">Thông tin chung</p>
            <div className="row">
                <TopCard title="LỊCH HỌC" text={`${numberItemsCount}`} icon="box" class="primary" />
            </div>

            <div className="row" id="search-box">
                <div className="col-xl-12 col-lg-12">
                    <div className="input-group" id="search-content">
                        <div className="form-outline">
                            <input type="text" id="form1" className="form-control" placeholder="Tìm kiếm" onChange={(event) => {
                                setSearchTerm(event.target.value)
                                console.log(searchTerm)
                            }}/>
                        </div>
                        <button type="button" className="btn btn-primary">
                            <i className="fas fa-search"></i>
                        </button>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-xl-12 col-lg-12">
                    <div className="card shadow mb-4">
                        <div className="card-header py-3">
                            <h6 className="m-0 font-weight-bold text-green">Danh sách lịch học</h6>
                            <div className="header-buttons">
                                <button className="btn btn-success btn-green" onClick={() => {
                                    dispatch(setModificationState(ScheduleModificationStatus.Create))
                                    onScheduleRemove()
                                }}>
                                    <i className="fas fa fa-plus"></i>
                                    Thêm lịch học
                                </button>
                            </div>
                        </div>
                        <div className="card-body">
                            <ScheduleList
                                onSelect={onScheduleSelect} value={searchTerm}
                            />
                        </div>
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
                            if ((schedules.modificationState === ScheduleModificationStatus.Create) || ((schedules.selectedSchedule) && (schedules.modificationState === ScheduleModificationStatus.Edit))) {
                                return <ScheduleForm isCheck={onRemovePopup}/>
                            }
                        }()
                    }
                </>
            </Popup>
            {
                function () {
                    if ((schedules.selectedSchedule) && (schedules.modificationState === ScheduleModificationStatus.Remove)) {
                        return (
                            <Popup
                                open={popup}
                                onClose={() => setPopup(false)}
                                closeOnDocumentClick
                            >
                                <div className="popup-modal" id="popup-modal">
                                    <div className="popup-title">
                                        Are you sure?
                                    </div>
                                    <div className="popup-content">
                                        <button type="button"
                                            className="btn btn-danger"
                                            onClick={() => {
                                                if (!schedules.selectedSchedule) {
                                                    return;
                                                }
                                                dispatch(deleteSchedule(schedules.selectedSchedule.id))
                                                dispatch(addNotification("Lịch học ", `${schedules.selectedSchedule.name} đã được xóa`));
                                                dispatch(removeSchedule(schedules.selectedSchedule.id));
                                                dispatch(clearSelectedSchedule());
                                                setPopup(false);
                                            }}>Remove
                                        </button>
                                    </div>
                                </div>
                            </Popup>
                        )
                    }
                }()
            }


        </Fragment >
    );
};

export default Schedule;
