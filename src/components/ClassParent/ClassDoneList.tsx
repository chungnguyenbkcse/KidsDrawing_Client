import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { IClassesParent } from "../../store/models/classes_parent.interface";
import { IClassesParentState, IStateType } from "../../store/models/root.interface";

export type classTeacherListProps = {
  onSelect?: (classTeacher: IClassesParent) => void;
  children?: React.ReactNode;
};

function ClassDoneList(props: classTeacherListProps): JSX.Element {
  const classes_parents: IClassesParentState = useSelector((state: IStateType) => state.classes_parents);

  const history = useHistory();
  const routeChange = (classes_parent: IClassesParent) => {
    let path = '/student/class'; 
    localStorage.removeItem('teacher_id');
    localStorage.setItem('teacher_id', classes_parent.teacher_id.toString())
    localStorage.removeItem('student_id');
    localStorage.setItem('student_id', classes_parent.student_id.toString())
    localStorage.removeItem('class_id');
    localStorage.setItem('class_id', classes_parent.id.toString());
    history.push({
        pathname: path,
    });
  }

  const lessonElements: (JSX.Element | null)[] = classes_parents.classes_done.map((contest, index) => {
    //console.log(strDate.substring(0, 10) + " " + strDate.substring(11,19))
    if (!contest) { return null; }
    return (<tr className={`table-row `}
      key={`lesson_${contest.id}`} onClick={() => { routeChange(contest) }}>
      <th scope="row" className="data-table">{index + 1}</th>
      <td className="data-table">{contest.student_name}</td>
      <td className="data-table">{contest.name}</td>
      <td className="data-table">{contest.course_name}</td>
      <td className="data-table">{contest.semester_name}</td>
      <td className="data-table">{contest.total_student}</td>
      <td className="data-table">{contest.total_section}</td>
    </tr>);
  });


  return (
    <Fragment>
      <div className="table-responsive portlet">
        <table className="table">
          <thead id="table-thread-contest-section">
            <tr>
              <th scope="col" className="name-row-table">#</th>
              <th scope="col" className="name-row-table">Bé</th>
              <th scope="col" className="name-row-table">Tên lớp</th>
              <th scope="col" className="name-row-table">Khóa học</th>
              <th scope="col" className="name-row-table">Học kì</th>
              <th scope="col" className="name-row-table">Số học viên</th>
              <th scope="col" className="name-row-table">Số buổi học</th>
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
