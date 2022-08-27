import React, { Dispatch } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { putTeacherLeaveStatus } from "../../common/service/TeacherLeave/PutTeacherLeave";
import { updateCurrentPath } from "../../store/actions/root.actions";
import { IStateType, ITeacherLeaveState } from "../../store/models/root.interface";
import { ITeacherLeave } from "../../store/models/teacher_leave.interface";

export type teacher_leaveListProps = {
  onSelect?: (teacher_leave: ITeacherLeave) => void;
  children?: React.ReactNode;
};

function TeacherRequestList(props: teacher_leaveListProps): JSX.Element  {
  const teacher_leaves: ITeacherLeaveState = useSelector((state: IStateType) => state.teacher_leaves);
  const dispatch: Dispatch<any> = useDispatch();
  dispatch(updateCurrentPath("Yêu cầu nghỉ dạy", ""));
  const history = useHistory();
  const routeChange1 = (teacher_leave: ITeacherLeave) => {
    localStorage.removeItem('resson_off_teacher')
    localStorage.setItem('resson_off_teacher', teacher_leave.description)
    let path = '/teacher-request/detail';
    history.push({
        pathname: path,
    });
  }

  const handleTeacherLeave = (teacher_leave: ITeacherLeave, status: string) => {
    const id = toast.loading("Đang xử lý. Vui lòng đợi giây lát...", {
      position: toast.POSITION.TOP_CENTER
    });
    dispatch(putTeacherLeaveStatus(teacher_leave.id, {
      status: status
    }, id))
  }
  const teacher_leaveElements: (JSX.Element | null)[] = teacher_leaves.leaves.map((teacher_leave, index) => {
    if (!teacher_leave) { return null; }
    return (<tr className={`table-row ${(teacher_leaves.selectedTeacherLeave && teacher_leaves.selectedTeacherLeave.id === teacher_leave.id) ? "selected" : ""}`}
      key={`teacher_leave_${teacher_leave.id}`}>
      <th scope="row" onClick={() => {routeChange1(teacher_leave)}}>{index}</th>
      <td onClick={() => {routeChange1(teacher_leave)}}>{teacher_leave.teacher_name}</td>
      <td onClick={() => {routeChange1(teacher_leave)}}>{teacher_leave.class_name}</td>
      <td onClick={() => {routeChange1(teacher_leave)}}>{teacher_leave.section_name}</td>
      <td onClick={() => {routeChange1(teacher_leave)}}>{teacher_leave.create_time}</td>
      <td onClick={() => {routeChange1(teacher_leave)}}>{teacher_leave.substitute_teacher_name}</td>
      <td>
        <button type="button" className="btn btn-primary" onClick={() => {handleTeacherLeave(teacher_leave, "Approved")}}>Chấp nhận</button>
      </td>
      <td>
        <button type="button" className="btn btn-danger" onClick={() => {handleTeacherLeave(teacher_leave, "Not approved")}}>Xóa</button>
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
