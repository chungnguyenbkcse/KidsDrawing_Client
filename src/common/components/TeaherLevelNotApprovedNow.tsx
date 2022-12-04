import React, { Dispatch, PropsWithChildren, ReactElement, useState } from "react";
import { BsFillTrashFill } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import Popup from "reactjs-popup";
import { changeSelectedTeacherRegisterQuatificationApproved, setModificationState } from "../../store/actions/teacher_register_quantification.action";
import { ITeacherRegisterQuantification, TeacherRegisterQuantificationModificationStatus } from "../../store/models/teacher_register_quantification.interface";
import { deleteTeacherLevel } from "../service/TeacherRegisterQuantification/DeleteTeacherRegisterLevel";
import { ICardProperties } from "../types/TopCardLevel.types";

function TopCardLevelNotApproveNow(props: PropsWithChildren<ICardProperties>): ReactElement {
    const dispatch: Dispatch<any> = useDispatch();
    const history = useHistory();
    const routeChange = (course_name: string, art_age_name: string, art_level_name: string, art_type_name: string, degree_photo_url: string) =>{ 
        let path = '/teacher-level/detail'; 
        history.push({
            pathname: path,
            state: { course_name: course_name, art_age_name: art_age_name, art_level_name: art_level_name, art_type_name: art_type_name, degree_photo_url: degree_photo_url}
        });
    }

    const [popup2, setPopup2] = useState(false);
    const [requestId, setRequestId] = useState<ITeacherRegisterQuantification>({
        id: 0,
        teacher_id: 0,
        teacher_name: "",
        reviewer_id: 0,
        course_id: 0,
        course_name: "",
        art_age_name: "",
        art_type_name: "",
        art_level_name: "",
        degree_photo_url: "",
        status: ""
    });
    
    return (
        <>
        <ToastContainer />

                {
                    function () {
                        if (requestId.id !== 0) {
                            return (
                                <Popup
                                    open={popup2}
                                    onClose={() => setPopup2(false)}
                                    closeOnDocumentClick
                                >
                                    <div className="popup-modal" id="popup-modal">
                                        <div className="popup-title">
                                            Bạn có chắc chắn muốn xóa?
                                        </div>
                                        <div className="popup-content">
                                            <button type="button"
                                                className="btn btn-danger"
                                                onClick={() => {
                                                    if (requestId.id === 0) {
                                                        return;
                                                    }
                                                    const idx = toast.loading("Đang xử lý. Vui lòng đợi giây lát...", {
                                                        position: toast.POSITION.TOP_CENTER
                                                    });
                                                    dispatch(deleteTeacherLevel(requestId.id, idx))
                                                    setPopup2(false);
                                                }}>Remove
                                            </button>
                                        </div>
                                    </div>
                                </Popup>
                            )
                        }
                    }()
                }
        <div className="col-xl-12 col-md-12 mb-4" onClick={() => {
            routeChange(props.course_name, props.art_age_name, props.art_level_name, props.art_type_name,
                props.degree_photo_url)}}
        >
            <div className={`card shadow h-100 py-2`} id="topcard-user">
                <div className="card-body">
                    <div className="row no-gutters align-items-center">
                        <div className="col mr-2">
                            <div className="text-xs font-weight-bold text-green text-uppercase mb-1">{props.course_name}</div>
                        </div>
                        <div className="col-auto" onClick={(e: any) => {
                            e.stopPropagation()
                            console.log("hello")
                            dispatch(changeSelectedTeacherRegisterQuatificationApproved(props.teacher_level));
                            dispatch(setModificationState(TeacherRegisterQuantificationModificationStatus.Edit))
                        }}>
                            <i className={`fas fa-${props.icon} fa-2x text-gray-300`} id="icon-user"></i>
                        </div>

                        <div className="col-auto pl-4">
                            <BsFillTrashFill color="#dc3545" size={25} onClick={(e) => {
                                e.stopPropagation(); 
                                setRequestId(props.teacher_level);
                                setPopup2(true)
                            }}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}


export default TopCardLevelNotApproveNow;
