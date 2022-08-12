import React, { Dispatch, PropsWithChildren, ReactElement } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { changeSelectedTeacherRegisterQuatificationApproved, setModificationState } from "../../store/actions/teacher_register_quantification.action";
import { TeacherRegisterQuantificationModificationStatus } from "../../store/models/teacher_register_quantification.interface";
import { ICardProperties } from "../types/TopCardLevel.types";

function TopCardLevel(props: PropsWithChildren<ICardProperties>): ReactElement {
    const dispatch: Dispatch<any> = useDispatch();
    const history = useHistory();
    const routeChange = (course_name: string, art_age_name: string, art_level_name: string, art_type_name: string, degree_photo_url: string) =>{ 
        let path = '/teacher-level/detail'; 
        history.push({
            pathname: path,
            state: { course_name: course_name, art_age_name: art_age_name, art_level_name: art_level_name, art_type_name: art_type_name, degree_photo_url: degree_photo_url}
        });
    }

    return (
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
                    </div>
                </div>
            </div>
        </div>
    );
}


export default TopCardLevel;
