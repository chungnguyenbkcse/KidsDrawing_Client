import React, { Fragment, Dispatch, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IStateType, IRootPageStateType } from "../../store/models/root.interface";
import { updateCurrentPath } from "../../store/actions/root.actions";
import { useLocation } from "react-router-dom";
import { clearSelectedTeacherRegisterNotQuatificationNow } from "../../store/actions/teacher_register_quantification.action";

interface DetailTeacherLevel {
    art_age_name: string;
    art_type_name: string;
    art_level_name: string;
    course_name: string;
    degree_photo_url: string;
}

const TeacherLevelDetail: React.FC = () => {
    const dispatch: Dispatch<any> = useDispatch();
    const path: IRootPageStateType = useSelector((state: IStateType) => state.root.page);

    const { state } = useLocation<any>();
    let data: DetailTeacherLevel = {
        art_age_name: "",
        art_level_name: "",
        art_type_name: "",
        course_name: "",
        degree_photo_url: ""
    }
    if (state !== undefined && state !== null) {
        data = state
    }

    useEffect(() => {
        dispatch(clearSelectedTeacherRegisterNotQuatificationNow());
        dispatch(updateCurrentPath("Đăng kí trình độ", "Chi tiết"));
    }, [path.area, dispatch]);

    return (
        <Fragment>
            <div className="col-xl-12 col-lg-12">
                <div className="card shadow mb-4">
                    <div className="card-body">
                        <div className="row no-gutters justify-content-center">
                            <h4 id="full-name">{data.course_name}</h4>
                        </div>

                        <div className="row">
                            <p className="col-4" id="type-name-teacher"><span className="header-card-course-teacher">Thể loại:</span> <span className="header-card-course-value-teacher">{data.art_type_name}</span></p>
                            <p className="col-4" id="level-name-teacher"><span className="header-card-course-teacher">Trình độ:</span> <span className="header-card-course-value-teacher">{data.art_level_name}</span></p>
                            <p className="col-4" id="age-name-teacher"><span className="header-card-course-teacher">Độ tuổi:</span> <span className="header-card-course-value-teacher">{data.art_age_name}</span></p>
                        </div>  
                        <div className="row justify-content-center">
                            <img src={data.degree_photo_url} alt="Preview"/>
                        </div>
                    </div>
                </div>
            </div>

        </Fragment >
    );
};

export default TeacherLevelDetail;
