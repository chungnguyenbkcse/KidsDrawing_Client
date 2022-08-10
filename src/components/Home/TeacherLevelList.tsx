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
    const courses: ICourseState = useSelector((state: IStateType) => state.courses);
    const listCourses: ICourse[] = courses.courses
    let courseList: string[] = []
    teacherRegisterQuantifications.teacherRegisterQuantifications.map((course_item) => {
        return listCourses.forEach(element => {
            if (element.id === course_item.course_id) {
                return courseList.push(element.name)
            }
        });
    })

    const teacherRegisterQuantificationElements: (JSX.Element | null)[] = teacherRegisterQuantifications.teacherRegisterQuantifications.map((teacherRegisterQuantification, index) => {
        if (!teacherRegisterQuantification) { return null; }
        return (
            <TopCardLevel title={courseList[index]} icon="book" class="primary" />
        );
    });


    return (
        <>
            {teacherRegisterQuantificationElements}
        </>
    );
}

export default TeacherRegisterQuantificationList;
