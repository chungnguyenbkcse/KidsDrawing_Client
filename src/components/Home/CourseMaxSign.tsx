import React from "react";
import { useSelector } from "react-redux";
import { IStateType, IUserRegisterJoinSemesterState, ISemesterCourseState, ICourseState } from "../../store/models/root.interface";
import { IUserRegisterJoinSemester } from "../../store/models/user_register_join_semester.interface";
import { useHistory } from "react-router-dom";
import { ISemesterCourse } from "../../store/models/semester_course.interface";
import { ICourse } from "../../store/models/course.interface";

export type user_register_semesterListProps = {
  onSelect?: (user_register_semester: IUserRegisterJoinSemester) => void;
  children?: React.ReactNode;
};

type CourseSemester = {
  course_semester_id: number;
  count: number;
}

function CourseMaxSign(props: user_register_semesterListProps): JSX.Element  {
  const user_register_semesters: IUserRegisterJoinSemesterState = useSelector((state: IStateType) => state.user_register_join_semesters);
  const history = useHistory();
  
  const routeChange = () =>{ 
    let path = '/courses/detail'; 
    history.push(path);
  }

  const userRegisterJoinSemesters: IUserRegisterJoinSemesterState = useSelector((state: IStateType) => state.user_register_join_semesters);

  const course_semesters: ISemesterCourseState = useSelector((state: IStateType) => state.semester_courses);
  const listSemesterCourses: ISemesterCourse[] = course_semesters.semesterCourses
  //console.log(listSemesterCourses)

  const courses: ICourseState = useSelector((state: IStateType) => state.courses);
  const listCourses: ICourse[] = courses.courses

  let courseList: string[] = []
  let semesterCourseList: CourseSemester[] = []
  //console.log(listCourses)


  listSemesterCourses.map((course) => {
    let count = 0;
    userRegisterJoinSemesters.userRegisterJoinSemesters.forEach(element => {
      if (course.id === element.semester_course_id) {
        count += 1;
      }
    });
    let semester_course: CourseSemester = {course_semester_id: course.id, count: count}
    if (semesterCourseList.length === 0) {
      semesterCourseList.push(semester_course)
    }
    else {
      let is_check = false;
      for (let index = 0; index < semesterCourseList.length; index++) {
        if (semester_course.count > semesterCourseList[index].count){
          is_check = true;
          semesterCourseList.splice(index, 0, semester_course);
          break;
        }
      }
      if (is_check === false) {
        semesterCourseList.push(semester_course)
      }
    }
  })
  let res: string[] = []
  for (let index = 0; index < 2; index++) {
    let course_name = ""
    let type_name = ""
    let level_name = ""
    let age_name = ""
    if (semesterCourseList[index].count > 0){
      for (let idx = 0; idx < listSemesterCourses.length; idx++) {
        if (semesterCourseList[index].course_semester_id === listSemesterCourses[index].id){
          for (let i = 0; i < listCourses.length; i++) {
            if (listSemesterCourses[index].course_id === listCourses[i].id){
              course_name = listCourses[i].name
              res.push(course_name)
              break
            }
          }
        }
        
      }
    }
  }

  console.log(res)

  const user_register_semesterElements: (JSX.Element | null)[] = courseList.map((user_register_semester, index) => {
    if (!user_register_semester) { return null; }
    return (<tr className={`table-row ${(user_register_semesters.selectedUserRegisterJoinSemester && user_register_semesters.selectedUserRegisterJoinSemester.id === index) ? "selected" : ""}`}
      key={`user_register_semester_${index}`}>
      <th scope="row">{index + 1}</th>
      <td onClick={routeChange}>{user_register_semester}</td>
    </tr>);
  });


  return (
    <div className="table-responsive portlet">
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Tên</th>
          </tr>
        </thead>
        <tbody>
          {user_register_semesterElements}
        </tbody>
      </table>
    </div>

  );
}

export default CourseMaxSign;
