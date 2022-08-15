import React from "react";
import { useSelector } from "react-redux";
import { ICourse } from "../../store/models/course.interface";
import { ICourseState, ISemesterClassState, IStateType, IUserRegisterJoinSemesterState, IUserState } from "../../store/models/root.interface";
import { ISemesterClass } from "../../store/models/semester_class.interface";
import { IUser } from "../../store/models/user.interface";
import { IUserRegisterJoinSemester } from "../../store/models/user_register_join_semester.interface"

export type userRegisterJoinSemesterListProps = {
  onSelect?: (userRegisterJoinSemester: IUserRegisterJoinSemester) => void;
  children?: React.ReactNode;
};

function TurnoverList(props: userRegisterJoinSemesterListProps): JSX.Element  {
  const userRegisterJoinSemesters: IUserRegisterJoinSemesterState = useSelector((state: IStateType) => state.user_register_join_semesters);

  const course_semesters: ISemesterClassState = useSelector((state: IStateType) => state.semester_classes);
  const listSemesterClasss: ISemesterClass[] = course_semesters.semesterClasses

  const courses: ICourseState = useSelector((state: IStateType) => state.courses);
  const listCourses: ICourse[] = courses.courses
  let courseList: string[] = []

  const users: IUserState =  useSelector((state: IStateType) => state.users);
  const listStudents: IUser[] = users.students
  const listParents: IUser[] = users.parents
  let studentList: string[] = []
  let parentList: string[] = []

  userRegisterJoinSemesters.userRegisterJoinSemesters.map((user_register_join_semester) => {
    return listSemesterClasss.forEach(element => {
      if (element.id === user_register_join_semester.semester_course_id) {
        return listCourses.forEach((ele) => {
          if (ele.id === element.course_id){
            return  courseList.push(ele.name)
          }
        })
      }
    });
  })

  userRegisterJoinSemesters.userRegisterJoinSemesters.map((user_register_join_semester) => {
    return listParents.forEach((element) => {
      if (element.id === user_register_join_semester.payer_id){
        return parentList.push(element.username)
      }
    })
  })

  userRegisterJoinSemesters.userRegisterJoinSemesters.map((user_register_join_semester) => {
    return listStudents.forEach((element) => {
      if (element.id === user_register_join_semester.student_id){
        return studentList.push(element.username)
      }
    })
  })

  const userRegisterJoinSemesterElements: (JSX.Element | null)[] = userRegisterJoinSemesters.userRegisterJoinSemesters.map((userRegisterJoinSemester, index) => {
    if (!userRegisterJoinSemester) { return null; }
    return (<tr className={`table-row ${(userRegisterJoinSemesters.selectedUserRegisterJoinSemester && userRegisterJoinSemesters.selectedUserRegisterJoinSemester.id === userRegisterJoinSemester.id) ? "selected" : ""}`}
      key={`userRegisterJoinSemester_${index}`}>
      <th scope="row">{index + 1}</th>
      <td>{parentList[index]}</td>
      <td>{studentList[index]}</td>
      <td>{courseList[index]}</td>
      <td>{userRegisterJoinSemester.price}</td>
      <td>{userRegisterJoinSemester.time}</td>
    </tr>);
  });


  return (
    <div className="table-responsive portlet">
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Phụ huynh</th>
            <th scope="col">Học sinh</th>
            <th scope="col">Khóa học</th>
            <th scope="col">Giá tiền</th>
            <th scope="col">Ngày giao dịch</th>
          </tr>
        </thead>
        <tbody>
          {userRegisterJoinSemesterElements}
        </tbody>
      </table>
    </div>

  );
}

export default TurnoverList;
