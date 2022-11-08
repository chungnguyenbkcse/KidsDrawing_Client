import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { IClassTeacher } from "../../store/models/class_teacher.interface";
import { IClassTeacherState, IStateType } from "../../store/models/root.interface";

export type classTeacherListProps = {
  onSelect?: (classTeacher: IClassTeacher) => void;
  children?: React.ReactNode;
};

function ClassDoneList(props: classTeacherListProps): JSX.Element {
  const class_teachers: IClassTeacherState = useSelector((state: IStateType) => state.class_teachers);

  const history = useHistory();
  const routeChange = (class_teacher: IClassTeacher) => {
    let path = '/classes-end/detail';
    localStorage.removeItem("class_id");
    localStorage.setItem("class_id", class_teacher.id.toString())
    localStorage.removeItem('class_end');
    localStorage.setItem('class_end', 'true');
    history.push({
      pathname: path,
      state: { class_id: class_teacher.id }
    });
  }

  const lessonElements: (JSX.Element | null)[] = class_teachers.class_done.map((contest, index) => {
    //console.log(strDate.substring(0, 10) + " " + strDate.substring(11,19))
    if (!contest) { return null; }
    return (<tr className={`table-row `}
      key={`lesson_${contest.id}`} onClick={() => { routeChange(contest) }}>
      <th scope="row" className="data-table">{index + 1}</th>
      <td className="data-table">{contest.name}</td>
      <td className="data-table">{contest.course_name}</td>
      <td className="data-table">{contest.semester_name}</td>
      <td className="data-table">{contest.total_student}</td>
      <td className="data-table">{contest.schedule}</td>
      <td className="data-table">{contest.num_of_section}</td>
    </tr>);
  });


  return (
    <Fragment>
      <div className="table-responsive portlet">
        <table className="table">
          <thead id="table-thread-contest-section">
            <tr>
              <th scope="col" className="name-row-table">#</th>
              <th scope="col" className="name-row-table">Tên lớp</th>
              <th scope="col" className="name-row-table">Khóa học</th>
              <th scope="col" className="name-row-table">Học kì</th>
              <th scope="col" className="name-row-table">Số học viên</th>
              <th scope="col" className="name-row-table">Lịch học</th>
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
