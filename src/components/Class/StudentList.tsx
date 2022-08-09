import React from "react";
import { useSelector } from "react-redux";
import { IStateType, IUserState } from "../../store/models/root.interface";
import { IUser } from "../../store/models/user.interface";
import { useHistory } from "react-router-dom";

function StudentList(): JSX.Element  {

  const students: IUserState = useSelector((state: IStateType) => state.users);
  const history = useHistory();

  
  const routeChange = () =>{ 
    let path = '/class/lesson'; 
    history.push(path);
  }


  const studentElements: (JSX.Element | null)[] = students.students.map((student, idx) => {
    if (!student) { return null; }
    return (<tr className={`table-row ${(students.selectedUser && students.selectedUser.id === student.id) ? "selected" : ""}`}
      key={`student_${idx}`} onClick={routeChange}>
      <th scope="row">{idx + 1}</th>
      <td>{student.username}</td>
      <td>{student.dateOfBirth}</td>
      <td>{student.sex}</td>
    </tr>);
  });


  return (
    <div className="table-responsive portlet">
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Tên</th>
            <th scope="col">Tuổi</th>
            <th scope="col">Giới tính</th>
          </tr>
        </thead>
        <tbody>
          {studentElements}
        </tbody>
      </table>
    </div>

  );
}

export default StudentList;
