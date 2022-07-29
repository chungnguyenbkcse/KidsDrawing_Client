import React from "react";
import { useSelector } from "react-redux";
import { IStateType, ITeacherLeaveState } from "../../store/models/root.interface";
import { ITeacherLeave } from "../../store/models/teacher_leave.interface";

export type teacher_leaveListProps = {
  onSelect?: (teacher_leave: ITeacherLeave) => void;
  children?: React.ReactNode;
};

function TeacherRequestList(props: teacher_leaveListProps): JSX.Element  {
  const teacher_leaves: ITeacherLeaveState = useSelector((state: IStateType) => state.teacher_leaves);
  const teacher_leaveElements: (JSX.Element | null)[] = teacher_leaves.leaves.map(teacher_leave => {
    if (!teacher_leave) { return null; }
    return (<tr className={`table-row ${(teacher_leaves.selectedTeacherLeave && teacher_leaves.selectedTeacherLeave.id === teacher_leave.id) ? "selected" : ""}`}
      key={`teacher_leave_${teacher_leave.id}`}>
      <th scope="row">{teacher_leave.id}</th>
      <td>{teacher_leave.teacher_id}</td>
      <td>{teacher_leave.class_id}</td>
      <td>{teacher_leave.section_id}</td>
      <td>{teacher_leave.substitute_teacher_id}</td>
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
            <th scope="col">Giáo viên</th>
            <th scope="col">Lớp</th>
            <th scope="col">Buổi</th>
            <th scope="col">Thời gian</th>
            <th scope="col">Giáo viên dạy thay</th>
            <th scope="col">Hành động</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {teacher_leaveElements}
        </tbody>
      </table>
    </div>

  );
}

export default TeacherRequestList;
