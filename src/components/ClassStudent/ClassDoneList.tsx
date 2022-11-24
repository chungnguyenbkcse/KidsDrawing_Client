import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { IClassesStudent } from "../../store/models/classes_student.interface";
import { IClassesStudentState, IStateType } from "../../store/models/root.interface";

export type classTeacherListProps = {
  onSelect?: (classTeacher: IClassesStudent) => void;
  children?: React.ReactNode;
};

function ClassDoneList(props: classTeacherListProps): JSX.Element {
  const classes_students: IClassesStudentState = useSelector((state: IStateType) => state.classes_students);

  const history = useHistory();
  const routeChange = (classes_student: IClassesStudent) => {
    let path = '/classes/review'; 
    localStorage.removeItem('teacher_id');
    localStorage.setItem('teacher_id', classes_student.teacher_id.toString())
    localStorage.removeItem('student_id');
    localStorage.setItem('student_id', classes_student.student_id.toString())
    localStorage.removeItem('class_id');
    localStorage.setItem('class_id', classes_student.id.toString());
    localStorage.removeItem('course_name');
    localStorage.setItem('course_name', classes_student.course_name)
    localStorage.removeItem('user_register_join_semester_id')
    localStorage.setItem('user_register_join_semester_id', classes_student.user_register_join_semester_id.toString())
    history.push({
        pathname: path,
    });
  }

  const lessonElements: (JSX.Element | null)[] = classes_students.classes_done.map((contest, index) => {
    //console.log(strDate.replaceAll("T", " ").substring(0,16))
    if (!contest) { return null; }
    return (<tr className={`table-row `}
      key={`lesson_${contest.id}`}>
      <th scope="row" className="data-table">{index + 1}</th>
      <td className="data-table">{contest.course_name}</td>
      <td className="data-table">{contest.semester_name}</td>
      <td className="data-table">{contest.total_student}</td>
      <td className="data-table">{contest.total_section}</td>
      <td className="data-table">
        <button 
            type="button" 
            className="btn btn-primary" 
            onClick={() => { routeChange(contest)}}
        >
            Xem review
        </button>
      </td>
    </tr>);
  });


  return (
    <Fragment>
      <div className="table-responsive portlet">
        <table className="table">
          <thead id="table-thread-contest-section">
            <tr>
              <th scope="col" className="name-row-table">#</th>
              <th scope="col" className="name-row-table">Khóa học</th>
              <th scope="col" className="name-row-table">Học kì</th>
              <th scope="col" className="name-row-table">Số học viên</th>
              <th scope="col" className="name-row-table">Số buổi học</th>
              <th scope="col" className="name-row-table"></th>
            </tr>
          </thead>
          <tbody>
            {lessonElements}
          </tbody>
        </table>
      </div>
    </Fragment>
  );
}

export default ClassDoneList;
