import React from "react";
import { useSelector } from "react-redux";
import { IStateType, IUserRegisterJoinSemesterState, ISemesterClassState, ICourseState } from "../../store/models/root.interface";
import { IUserRegisterJoinSemester } from "../../store/models/user_register_join_semester.interface";
import { useHistory } from "react-router-dom";
import { ISemesterClass } from "../../store/models/semester_class.interface";
import { ICourse } from "../../store/models/course.interface";

export type user_register_semesterListProps = {
    onSelect?: (user_register_semester: IUserRegisterJoinSemester) => void;
    children?: React.ReactNode;
};

type CourseSemester = {
    course_semester_id: number;
    count: number;
}

function TopTeacher(props: user_register_semesterListProps): JSX.Element {
    const user_register_semesters: IUserRegisterJoinSemesterState = useSelector((state: IStateType) => state.user_register_join_semesters);
    const history = useHistory();

    const routeChange = () => {
        let path = '/courses/detail';
        history.push(path);
    }

    const userRegisterJoinSemesters: IUserRegisterJoinSemesterState = useSelector((state: IStateType) => state.user_register_join_semesters);

    const course_semesters: ISemesterClassState = useSelector((state: IStateType) => state.semester_classes);
    const listSemesterClasss: ISemesterClass[] = course_semesters.semesterClasses
    //console.log(listSemesterClasss)

    const courses: ICourseState = useSelector((state: IStateType) => state.courses);
    const listCourses: ICourse[] = courses.courses

    let courseList: string[] = []
    let semesterCourseList: CourseSemester[] = []
    //console.log(listCourses)

    const user_register_semesterElements: (JSX.Element | null)[] = courseList.map((user_register_semester, index) => {
        if (!user_register_semester) { return null; }
        return (<tr className={`table-row ${(user_register_semesters.selectedUserRegisterJoinSemester && user_register_semesters.selectedUserRegisterJoinSemester.id === index) ? "selected" : ""}`}
            key={`user_register_semester_${index}`}>
            <th scope="row">{index + 1}</th>
            <td onClick={routeChange}>{user_register_semester}</td>
            <th scope="row"></th>
            <th scope="row"></th>
        </tr>);
    });


    return (
        <div className="table-responsive portlet">
            <table className="table">
                <thead className="thead-light">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Tên</th>
                        <th scope="col">Số bài được giao</th>
                        <th scope="col">Đã chấm</th>
                    </tr>
                </thead>
                <tbody>
                    {user_register_semesterElements}
                </tbody>
            </table>
        </div>

    );
}

export default TopTeacher;
