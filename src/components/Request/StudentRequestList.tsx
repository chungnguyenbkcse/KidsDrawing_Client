import React from "react";
import { useSelector } from "react-redux";
import { IStateType, IStudentLeaveState } from "../../store/models/root.interface";
import { IStudentLeave } from "../../store/models/student_leave.interface";

export type studentListProps = {
  onSelect?: (student: IStudentLeave) => void;
  children?: React.ReactNode;
};

function StudentRequestList(props: studentListProps): JSX.Element  {
  const students: IStudentLeaveState = useSelector((state: IStateType) => state.student_leaves);

  const studentElements: (JSX.Element | null)[] = students.leaves.map(student => {
    if (!student) { return null; }
    return (<tr className={`table-row ${(students.selectedStudentLeave && students.selectedStudentLeave.id === student.id) ? "selected" : ""}`}
      key={`student_${student.id}`}>
      <th scope="row">{student.id}</th>
      <td>{student.student_id}</td>
      <td>{student.class_id}</td>
      <td>{student.section_id}</td>
      <td>
        <button type="button" className="btn btn-primary">Chấp nhận</button>
      </td>
      <td>
        <button type="button" className="btn btn-danger">Xóa</button>
      </td>
    </tr>);
  });


  return (
    <div className="table-responsive portlet">
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Học sinh</th>
            <th scope="col">Lớp</th>
            <th scope="col">Buổi</th>
            <th scope="col">Thời gian</th>
            <th scope="col">Giáo viên</th>
            <th scope="col">Hành động</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {studentElements}
        </tbody>
      </table>
    </div>

  );
}

export default StudentRequestList;
