import React from "react";
import { useSelector } from "react-redux";
import TopCardLevel from "../../common/components/TopCardLevel";
import { IStateType, ITeacherRegisterQuantificationState } from "../../store/models/root.interface";
import { ITeacherRegisterQuantification } from "../../store/models/teacher_register_quantification.interface";

export type teacherRegisterQuantificationListProps = {
    onSelect?: (teacherRegisterQuantification: ITeacherRegisterQuantification) => void;
    children?: React.ReactNode;
};

function TeacherLevelNotApprovedNowList(props: teacherRegisterQuantificationListProps): JSX.Element {
    const teacherRegisterQuantifications: ITeacherRegisterQuantificationState = useSelector((state: IStateType) => state.teacher_register_quantifications);

    const teacherRegisterQuantificationElements: (JSX.Element | null)[] = teacherRegisterQuantifications.not_approved_now.map((ele, index) => {
        if (!ele) { return null; }
        return (
            <TopCardLevel 
                course_name={ele.course_name} 
                icon="edit" class="warning" 
                art_age_name={ele.art_age_name}
                art_level_name={ele.art_level_name}
                art_type_name={ele.art_type_name}
                degree_photo_url={ele.degree_photo_url}
                teacher_level={ele}
             />
        );
    });


    return (
        <>
            {
                function () {
                    if (teacherRegisterQuantificationElements.length === 0) {
                        return (
                            <div className="col-xl-12 col-md-12 mb-4">
                                <p id="not-data-not-register-now">Không có dữ liệu!</p>
                            </div>
                        )
                    }
                    else {
                        return teacherRegisterQuantificationElements
                    } 
                }()
            }
        </>
    );
}

export default TeacherLevelNotApprovedNowList;
