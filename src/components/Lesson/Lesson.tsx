import React, { Fragment, Dispatch, useState, useEffect } from "react";
import LessonList from "./LessonList";
import LessonForm from "./LessonForm";
import TopCard from "../../common/components/TopCard";
import "./Lesson.css";
import { useDispatch, useSelector } from "react-redux";
import { updateCurrentPath } from "../../store/actions/root.actions";
import { ILessonState, IStateType, IRootPageStateType } from "../../store/models/root.interface";
import Popup from "reactjs-popup";
import {
    removeLesson, clearSelectedLesson, setModificationState,
    changeSelectedLesson
} from "../../store/actions/lesson.action";
import { addNotification } from "../../store/actions/notifications.action";
import { LessonModificationStatus, ILesson } from "../../store/models/lesson.interface";
import { getLesson } from "../../common/service/Lesson/GetLesson";
import { deleteLesson } from "../../common/service/Lesson/DeleteLesson";
import { logout } from "../../store/actions/account.actions";
import jwt_decode from "jwt-decode";
import { ToastContainer } from "react-toastify";


const Lesson: React.FC = () => {
    const dispatch: Dispatch<any> = useDispatch();
    const lessons: ILessonState = useSelector((state: IStateType) => state.lessons);
    const path: IRootPageStateType = useSelector((state: IStateType) => state.root.page);
    const numberItemsCount: number = lessons.lessons.length;
    const [popup, setPopup] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

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
                    dispatch(getLesson())
                }
            }
            else {
                dispatch(getLesson())
            }
        }
    }, [dispatch, access_token, refresh_token])

    useEffect(() => {
        dispatch(clearSelectedLesson());
        dispatch(updateCurrentPath("Tiết học", "Danh sách"));
    }, [path.area, dispatch]);

    function onLessonSelect(lesson: ILesson): void {
        dispatch(changeSelectedLesson(lesson));
        onLessonRemove();
        dispatch(setModificationState(LessonModificationStatus.None));
    }

    function onLessonRemove() {
        setPopup(true);
    }

    function onRemovePopup(value: boolean) {
        setPopup(false);
    }


    return (
        <Fragment>
            <ToastContainer />
            <h1 className="h3 mb-2 text-gray-800">Tiết học</h1>
            <p className="mb-4">Thông tin chung</p>
            <div className="row">
                <TopCard title="TIẾT HỌC" text={`${numberItemsCount}`} icon="box" class="primary" />
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
                            <h6 className="m-0 font-weight-bold text-green">Danh sách tiết học</h6>
                            <div className="header-buttons">
                                <button className="btn btn-success btn-green" onClick={() => {
                                    dispatch(setModificationState(LessonModificationStatus.Create))
                                    onLessonRemove()
                                }}>
                                    <i className="fas fa fa-plus"></i>
                                    Thêm tiết học
                                </button>
                            </div>
                        </div>
                        <div className="card-body">
                            <LessonList
                                onSelect={onLessonSelect} value={searchTerm}
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
                            if ((lessons.modificationState === LessonModificationStatus.Create) || ((lessons.selectedLesson) && (lessons.modificationState === LessonModificationStatus.Edit))) {
                                return <LessonForm isCheck={onRemovePopup}/>
                            }
                        }()
                    }
                </>
            </Popup>
            {
                function () {
                    if ((lessons.selectedLesson) && (lessons.modificationState === LessonModificationStatus.Remove)) {
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
                                                if (!lessons.selectedLesson) {
                                                    return;
                                                }
                                                dispatch(deleteLesson(lessons.selectedLesson.id))
                                                dispatch(addNotification("Tiết học ", `${lessons.selectedLesson.start_time} đã được xóa`));
                                                dispatch(removeLesson(lessons.selectedLesson.id));
                                                dispatch(clearSelectedLesson());
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

export default Lesson;
