import jwt_decode from "jwt-decode";
import React, { Dispatch, Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TopCard from "../../common/components/TopCardUser";
import { logout } from "../../store/actions/account.actions";
import { changeSelectedUser, setModificationState } from "../../store/actions/users.action";
import { IScheduleTimeClassState, IStateType, IUserState } from "../../store/models/root.interface";
import { IUser, UserModificationStatus } from "../../store/models/user.interface";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import Loading from "../../common/components/Loading";
import { getStudentByParent } from "../../common/service/Student/GetStudentByParent";
import AccountChildList from "./AccountChildList";
import "./ParentHome.css"
import Popup from "reactjs-popup";
import AccountChildForm from "../AccountChild/AccountChildForm";
import { Eventcalendar } from '@mobiscroll/react';
import '@mobiscroll/react/dist/css/mobiscroll.min.css';
import { getScheduleTimeByParent } from "../../common/service/ScheduleTimeClass/GetScheduleTimeByParent";


const ParentHome: React.FC = () => {
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

    function onUserSelect(lesson: IUser): void {
        dispatch(changeSelectedUser(lesson));
        onUserRemove();
        dispatch(setModificationState(UserModificationStatus.None));
    }

    function onUserRemove() {
        setPopup(true);
    }

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
                    trackPromise(getStudentByParent(dispatch, id))
                    trackPromise(getScheduleTimeByParent(dispatch, id))
                }
            }
            else {
                trackPromise(getStudentByParent(dispatch, id))
                trackPromise(getScheduleTimeByParent(dispatch, id))
            }
        }
    }, [dispatch, access_token, refresh_token, id]);

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
                    <TopCard title="TÀI KHOẢN CON" text={`${numberChildCount}`} icon="user" class="primary" />
                    <TopCard title="SỐ TIỀN" text={`${numberChildCount}`} icon="donate" class="primary" />
                    <div className="col-xl-6 col-md-6 mb-4" id="content-button-create-teacher-level">
                        <button className="btn btn-success btn-green mr-0" id="btn-create-teacher-level" onClick={() => {
                            dispatch(setModificationState(UserModificationStatus.Create))
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
                                if ((users.modificationState === UserModificationStatus.Create) || ((users.selectedUser) && (users.modificationState === UserModificationStatus.Edit))) {
                                    return <AccountChildForm isCheck={onRemovePopup} />
                                }
                            }()
                        }
                    </>
                </Popup>

                <div className="row">
                    <div className="col-xl-6 col-md-6 mb-4">
                        <h3 className=" mb-2" id="level-teacher">Danh sách tài khoản con</h3>
                        <AccountChildList
                            onSelect={onUserSelect}
                        />
                    </div>
                    <div className="col-xl-6 col-md-6 mb-4">
                        <h3 className=" mb-2" id="level-teacher">Lịch trong ngày</h3>
                        <Eventcalendar
                            data={data}
                            view={{
                                schedule: {
                                    type: 'day',
                                    startDay: 1,
                                    endDay: 5,
                                    startTime: '07:00',
                                    endTime: '18:00',
                                    timeCellStep: 60,
                                    timeLabelStep: 60
                                }
                            }}
                        />
                    </div>
                </div>



            </Fragment>
    );
};

export default ParentHome;
