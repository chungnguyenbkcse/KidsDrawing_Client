import React from "react";
import { useSelector } from "react-redux";
import TopCardLevel from "../../common/components/TopCardLevel";
import { ICourse } from "../../store/models/course.interface";
import { ICourseState, IStateType, ITeacherRegisterQuantificationState } from "../../store/models/root.interface";
import { ITeacherRegisterQuantification } from "../../store/models/teacher_register_quantification.interface";

export type teacherRegisterQuantificationListProps = {
    onSelect?: (teacherRegisterQuantification: ITeacherRegisterQuantification) => void;
    children?: React.ReactNode;
};

function TeacherRegisterQuantificationList(props: teacherRegisterQuantificationListProps): JSX.Element {
    const teacherRegisterQuantifications: ITeacherRegisterQuantificationState = useSelector((state: IStateType) => state.teacher_register_quantifications);

    const teacherRegisterQuantificationElements: (JSX.Element | null)[] = teacherRegisterQuantifications.approveds.map((ele, index) => {
        if (!ele) { return null; }
        return (
            <TopCardLevel title={ele.course_name} icon="book" class="primary" />
        );
    });


    return (
        <>
            {teacherRegisterQuantificationElements}
        </>
    );
}

export default TeacherRegisterQuantificationList;
