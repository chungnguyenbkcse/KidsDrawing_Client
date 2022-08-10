import React from "react";
import { useSelector } from "react-redux";
import TopCardCourse from "../../common/components/TopCardCourse";
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
    let lst = [1,2,3,4,5,6]

    const teacherRegisterQuantificationElements: (JSX.Element | null)[] = lst.map((teacherRegisterQuantification, index) => {
        if (!teacherRegisterQuantification) { return null; }
        return (<tr className={`table-row`} key={`semester_course_${index}`}>
            <TopCardCourse title={"index"} icon="book" class="primary" />
        </tr>
        );
    });


    return (
        <div className="table-responsive portlet">
      <table className="table">
        <thead className="thead-light">
          <tr>
          </tr>
        </thead>
        <tbody>
          {teacherRegisterQuantificationElements}
        </tbody>
      </table>
    </div>
    );
}

export default TeacherRegisterQuantificationList;
