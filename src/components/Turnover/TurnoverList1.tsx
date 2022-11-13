import React from "react";
import { useSelector } from "react-redux";
import {IStateType, IUserRegisterJoinSemesterState } from "../../store/models/root.interface";
import { IUserRegisterJoinSemester } from "../../store/models/user_register_join_semester.interface"

export type userRegisterJoinSemesterListProps = {
  onSelect?: (userRegisterJoinSemester: IUserRegisterJoinSemester) => void;
  children?: React.ReactNode;
};

function TurnoverList1(props: userRegisterJoinSemesterListProps): JSX.Element  {
  const userRegisterJoinSemesters: IUserRegisterJoinSemesterState = useSelector((state: IStateType) => state.user_register_join_semesters);


  const userRegisterJoinSemesterElements: (JSX.Element | null)[] = userRegisterJoinSemesters.completed.map((userRegisterJoinSemester, index) => {
    if (!userRegisterJoinSemester) { return null; }
    return (<tr className={`table-row ${(userRegisterJoinSemesters.selectedUserRegisterJoinSemester && userRegisterJoinSemesters.selectedUserRegisterJoinSemester.id === userRegisterJoinSemester.id) ? "selected" : ""}`}
      key={`userRegisterJoinSemester_${index}`}>
      <th scope="row">{index + 1}</th>
      <td>{userRegisterJoinSemester.payer_name}</td>
      <td>{userRegisterJoinSemester.student_name}</td>
      <td>{userRegisterJoinSemester.course_name}</td>
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

export default TurnoverList1;
