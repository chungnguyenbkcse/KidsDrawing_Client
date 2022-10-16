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
  course_semester_id: string;
  count: number;
}

function CourseMaxSign(props: user_register_semesterListProps): JSX.Element  {
  const user_register_semesters: IUserRegisterJoinSemesterState = useSelector((state: IStateType) => state.user_register_join_semesters);
  const history = useHistory();
  
  const routeChange = () =>{ 
    let path = '/semester-class/detail'; 
    history.push(path);
  }

  const userRegisterJoinSemesters: IUserRegisterJoinSemesterState = useSelector((state: IStateType) => state.user_register_join_semesters);

  const course_semesters: ISemesterClassState = useSelector((state: IStateType) => state.semester_classes);
  const listSemesterClasss: ISemesterClass[] = course_semesters.semesterClasses
  //console.log(listSemesterClasss)

  const courses: ICourseState = useSelector((state: IStateType) => state.courses);
  const listCourses: ICourse[] = courses.courses

  let courseList: string[] = []
  let semesterClassList: CourseSemester[] = []
  //console.log(listCourses)


  listSemesterClasss.map((course) => {
    let count = 0;
    userRegisterJoinSemesters.completed.forEach(element => {
      if (course.id === element.semester_class_id) {
        count += 1;
      }
    });
    let semester_class: CourseSemester = {course_semester_id: course.id, count: count}
    if (semesterClassList.length === 0) {
      semesterClassList.push(semester_class)
    }
    else {
      let is_check = false;
      for (let index = 0; index < semesterClassList.length; index++) {
        if (semester_class.count > semesterClassList[index].count){
          is_check = true;
          semesterClassList.splice(index, 0, semester_class);
          break;
        }
      }
      if (is_check === false) {
        semesterClassList.push(semester_class)
      }
    }
  })
  let res: string[] = []
  for (let index = 0; index < 2; index++) {
    let course_name = ""
    let type_name = ""
    let level_name = ""
    let age_name = ""
    if (semesterClassList[index].count > 0){
      for (let idx = 0; idx < listSemesterClasss.length; idx++) {
        if (semesterClassList[index].course_semester_id === listSemesterClasss[index].id){
          for (let i = 0; i < listCourses.length; i++) {
            if (listSemesterClasss[index].course_id === listCourses[i].id){
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
    return (<tr className={`table-row`}
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
